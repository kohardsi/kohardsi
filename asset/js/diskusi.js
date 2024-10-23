// Function to get page ID from document title
function getPageIdFromDocumentTitle() {
  return document.title.replace(/\s+/g, '-').toLowerCase();
}

// Reference to the discussion list in the database based on page ID
var pageId = getPageIdFromDocumentTitle();
var discussionRef = firebase.database().ref('discussions/' + pageId);

// Listen for form submit
document.getElementById('discussionForm').addEventListener('submit', submitForm);

// Load saved name from local storage
document.addEventListener('DOMContentLoaded', function() {
  var savedName = localStorage.getItem('username');
  if (savedName) {
    document.getElementById('name').value = savedName;
    document.getElementById('name').disabled = true;
  }
  // Retrieve discussions on page load
  retrieveDiscussions();
});

function submitForm(e) {
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var message = getInputVal('message');

  // Save discussion
  saveDiscussion(name,message);

  // Save name to local storage if not already saved
  if (!localStorage.getItem('username')) {
    localStorage.setItem('username', name);
    document.getElementById('name').disabled = true;
  }

  // Clear message field
  document.getElementById('message').value = '';
}

// Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save discussion to firebase
// Modifikasi fungsi saveDiscussion untuk menyimpan topik bersama dengan diskusi
function saveDiscussion(name,message) {
  var newDiscussionRef = discussionRef.push();
  newDiscussionRef.set({
    name: name,
    message: message,
    upvotes: 0,
    downvotes: 0,
    timestamp: Date.now()
  });
}

// Menampilkan diskusi dengan topiknya
// Menampilkan semua diskusi
function retrieveDiscussions() {
  discussionRef.on('value', function(snapshot) {
    var discussions = snapshot.val();
    var discussionList = document.getElementById('discussionList');
    discussionList.innerHTML = '';

    for (var id in discussions) {
      var discussion = discussions[id];
      var li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `
        <strong>${discussion.name}</strong>: 
        ${discussion.message}
        <div class="vote-buttons">
          <button class="btn btn-sm btn-success" onclick="upvoteDiscussion('${id}')"><i class="bi bi-hand-thumbs-up-fill"></i></button>
          <span id="upvotes-${id}">${discussion.upvotes}</span>
          <button class="btn btn-sm btn-danger" onclick="downvoteDiscussion('${id}')"><i class="bi bi-hand-thumbs-down-fill"></i></button>
          <span id="downvotes-${id}">${discussion.downvotes}</span>
        </div>
        <small>${new Date(discussion.timestamp).toLocaleString()}</small>
      `;
      discussionList.appendChild(li);
    }
  });
}




// Save reply to firebase
function saveReply(discussionId, name, message) {
  var replyRef = discussionRef.child(discussionId).child('replies').push();
  replyRef.set({
    name: name,
    message: message,
    upvotes: 0,
    downvotes: 0,
    timestamp: Date.now()
  });
}

// Retrieve discussions
function retrieveDiscussions() {
  discussionRef.on('value', function(snapshot) {
    var discussions = snapshot.val();
    var discussionList = document.getElementById('discussionList');
    discussionList.innerHTML = '';
    for (var id in discussions) {
      var li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `
        <p><strong>${discussions[id].name}</strong>: <small>${new Date(discussions[id].timestamp).toLocaleString()}</small></p>
        <p>${discussions[id].message}</p>
        <div class="vote-buttons">
          <button class="btn btn-sm btn-success" onclick="upvoteDiscussion('${id}')"><i class="bi bi-hand-thumbs-up-fill"></i></button>
          <span id="upvotes-${id}">${discussions[id].upvotes}</span>
          <button class="btn btn-sm btn-danger" onclick="downvoteDiscussion('${id}')"><i class="bi bi-hand-thumbs-down-fill"></i></button>
          <span id="downvotes-${id}">${discussions[id].downvotes}</span>
        </div>
        
        <ul class="list-group mt-3" id="replies-${id}"></ul>
        <button class="btn btn-link btn-sm mt-2" onclick="toggleReplyForm('${id}')">Balas</button>
        <form id="replyForm-${id}" class="mt-2" style="display: none;">
          <div class="form-group">
            <input type="text" class="form-control" id="replyName-${id}" placeholder="Nama" required>
          </div>
          <div class="form-group">
            <textarea class="form-control" id="replyMessage-${id}" rows="2" placeholder="Balasan" required></textarea>
          </div>
          <button type="submit" class="btn btn-secondary">Kirim</button>
        </form>
      `;
      discussionList.appendChild(li);

      // Listen for reply form submit
      document.getElementById(`replyForm-${id}`).addEventListener('submit', function(e) {
        e.preventDefault();
        var name = document.getElementById(`replyName-${id}`).value;
        var message = document.getElementById(`replyMessage-${id}`).value;
        saveReply(id, name, message);
        document.getElementById(`replyForm-${id}`).reset();
        toggleReplyForm(id); // Hide the form after submitting
      });

      // Retrieve replies
      if (discussions[id].replies) {
        var replies = discussions[id].replies;
        var repliesList = document.getElementById(`replies-${id}`);
        for (var replyId in replies) {
          var replyLi = document.createElement('li');
          replyLi.className = 'list-group-item';
          replyLi.innerHTML = `
            <p><strong>${replies[replyId].name}</strong>: <small>${new Date(replies[replyId].timestamp).toLocaleString()}</small></p>
            <p>${replies[replyId].message}</p>
            <div class="vote-buttons">
              <button class="btn btn-sm btn-success" onclick="upvoteReply('${id}', '${replyId}')"><i class="bi bi-hand-thumbs-up-fill"></i></button>
              <span id="upvotes-${id}-${replyId}">${replies[replyId].upvotes}</span>
              <button class="btn btn-sm btn-danger" onclick="downvoteReply('${id}', '${replyId}')"><i class="bi bi-hand-thumbs-down-fill"></i></button>
              <span id="downvotes-${id}-${replyId}">${replies[replyId].downvotes}</span>
            </div>
            
          `;
          repliesList.appendChild(replyLi);
        }
      }
    }
  });
}

// Toggle reply form visibility
function toggleReplyForm(id) {
  var replyForm = document.getElementById(`replyForm-${id}`);
  if (replyForm.style.display === 'none' || replyForm.style.display === '') {
    replyForm.style.display = 'block';
    // Pre-fill and disable the name field with the saved name
    var savedName = localStorage.getItem('username');
    if (savedName) {
      document.getElementById(`replyName-${id}`).value = savedName;
      document.getElementById(`replyName-${id}`).disabled = true;
    }
  } else {
    replyForm.style.display = 'none';
  }
}

// Upvote discussion
function upvoteDiscussion(id) {
  var upvoteRef = discussionRef.child(id).child('upvotes');
  upvoteRef.transaction(function(currentUpvotes) {
    return (currentUpvotes || 0) + 1;
  });
}

// Downvote discussion
function downvoteDiscussion(id) {
  var downvoteRef = discussionRef.child(id).child('downvotes');
  downvoteRef.transaction(function(currentDownvotes) {
    return (currentDownvotes || 0) + 1;
  });
}

// Upvote reply
function upvoteReply(discussionId, replyId) {
  var upvoteRef = discussionRef.child(discussionId).child('replies').child(replyId).child('upvotes');
  upvoteRef.transaction(function(currentUpvotes) {
    return (currentUpvotes || 0) + 1;
  });
}

// Downvote reply
function downvoteReply(discussionId, replyId) {
  var downvoteRef = discussionRef.child(discussionId).child('replies').child(replyId).child('downvotes');
  downvoteRef.transaction(function(currentDownvotes) {
    return (currentDownvotes || 0) + 1;
  });
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
  var query = this.value.toLowerCase();
  var discussionList = document.getElementById('discussionList');
  var items = discussionList.getElementsByTagName('li');
  Array.from(items).forEach(function(item) {
    var message = item.textContent || item.innerText;
    if (message.toLowerCase().indexOf(query) !== -1) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
});