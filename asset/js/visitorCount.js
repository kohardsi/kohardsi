 var firebaseConfig = {
   apiKey: "AIzaSyC93TW6swGTCyYpmamq7df0mwx4dm3BKGw",
   authDomain: "kohardsi.firebaseapp.com",
   projectId: "kohardsi",
   storageBucket: "kohardsi.appspot.com",
   messagingSenderId: "608640770591",
   appId: "1:608640770591:web:e6727e99b45dd688982b2a",
   measurementId: "G-73FBXHV2KW"
 };
 firebase.initializeApp(firebaseConfig);

$(document).ready(function() {
    var pageId = getPageIdFromDocumentTitle();
    
    // Memeriksa apakah pengguna telah memberikan suka sebelumnya menggunakan localStorage
    var likedBefore = localStorage.getItem(pageId + '_liked');
    if (likedBefore) {
        $('#like-button').prop("disabled", true); // Menonaktifkan tombol suka jika pengguna telah memberikan suka sebelumnya
    }

    if (pageId) {
        var viewStats = firebase.database().ref("pages/id/" + pageId + "/views");
        var likeStatsRef = firebase.database().ref("pages/id/" + pageId + "/likes");

        viewStats.once('value').then(function(snapshot) {
            var viewCount = snapshot.val() || 0;
            $('#view').text(viewCount);
            viewStats.set(viewCount + 1);
        }).catch(function(error) {
            console.error("Error getting view count: ", error);
        });

        likeStatsRef.once('value').then(function(snapshot) {
            var likeCount = snapshot.val() || 0;
            $('#like').text(likeCount);

            $('#like-button').on('click', function() {
                // Memeriksa apakah pengguna telah memberikan suka sebelumnya menggunakan localStorage
                var likedBefore = localStorage.getItem(pageId + '_liked');
                if (!likedBefore) { // Jika belum memberikan suka sebelumnya
                    likeStatsRef.transaction(function(likes) {
                        return (likes || 0) + 1;
                    }).then(function() {
                        $('#like-button').prop("disabled", true); // Menonaktifkan tombol suka setelah memberikan suka
                        // Menyimpan status suka pengguna ke localStorage
                        localStorage.setItem(pageId + '_liked', true);
                    }).catch(function(error) {
                        console.error("Error updating like count: ", error);
                    });
                }
            });
        }).catch(function(error) {
            console.error("Error getting like count: ", error);
        });
    }
});


        function getPageIdFromDocumentTitle() {
            return document.title.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        }