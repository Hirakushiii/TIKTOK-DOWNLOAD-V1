const apikey = "https://api.nyxs.pw/dl/tiktok?url=";
const params = new URL(window.location.href);
let UrlQuery = document.querySelector("#query-download");



document.addEventListener('DOMContentLoaded', async () => {
  const lnValue = params.searchParams.get('ld');
  const button = document.getElementById('download-btn');

  if (lnValue) {
    // 1. Isi input dalam section
    const input = document.querySelector('#query-download');
    input.value = lnValue;

    // 2. Trigger tombol kirim secara otomatis
    await simulateButtonClick(button); // Async/Await
    console.log(lnValue);
  }
  // }else if(UrlQuery.value.includes('www.tiktok.com/')){
  //   button.click();
  // }
});
async function simulateButtonClick(button) {
  await button.click(); // secara visual klik
}

document.querySelector("#download-btn").addEventListener("click", async () => {
  if (UrlQuery.value === "") {
    return Swal.fire({
      title: "Ahhh?",
      text: "Kemana perginya link tiktokmu?",
      icon: "question",
    });
  } else if (!UrlQuery.value.includes("tiktok.com")) {
    Swal.fire({
      title: "Upsss!",
      text: "Kamu memasukkan link url yang salah bro! :>",
      icon: "error",
    });
  } else if (UrlQuery.value.includes("tiktok.com/music")) {
    // await params.searchParams.set('ld', UrlQuery.value);
    // window.history.replaceState({}, '', params);
    // fetch(`${apikey}${UrlQuery.value}`)
    // .then((response) => {
    //   if (!response.ok) {
    //     console.error(response.statusText);
    //   }
    //   return response.json();
    // })
    // .then(async (Response) => {
    //   // console.log(Response.result);
    //     document.querySelector(".download-section").innerHTML = Audio_fragment(
    //       Response.result
    //     );
    //   });
    document.querySelector(".download-section").innerHTML = await loading_fragment();
    await Swal.fire({
    title: "Upsss!",
    text: "Sorry Bro, Untuk Pengunduhan Audio Only Sekarang Sedang Dalam Pebaikan. Jadii,  Diimbau Untuk Mengunduh Audio Menggunakan Link Video Dari Pemilik Asli Audio Tersebut! TERIMA KASIH... :>",
      icon: "error",
    });
    window.location.reload();
  } else {
    fetch(`${apikey}${UrlQuery.value}`)
    .then(async (response) => {
        if (!response.ok) {
          // console.log(response);
          await alert(
            "Error bro, hehe. Dari severnya nih jemberrr\nKamu bisa mengunjungi website tetangga jika urgent\n"
          );
          const Konfirmasi = await confirm("Ingin pergi ke website tetangga?");
          if (Konfirmasi) {
            window.location.href = "https://musicaldown.com/en";
          } else {
            return location.reload();
          }
        }
        return response.json();
      })
      .then(async (Response) => {
        await params.searchParams.set('ld', UrlQuery.value);
        window.history.replaceState({}, '', params);
        // console.log(Response.result);
        // BUAT VALIDASI APAKAH LINK TERSEBUT VIDEO ATAU FOTO SLIDESHOW! (RED LINE!!!)
        if (Response.result.result.type === "image") {
          const alldata = Response.result.result;
          let card = "";
          alldata.images.forEach((e) => {
            card += Images_Fragment(e);
          });
          document.querySelector(
            ".download-section"
          ).innerHTML = `<div class="container row row-cols-2 row-cols-md-3 g-4 mx-auto download-image-area"></div>`;
          document.querySelector(".download-image-area").innerHTML = card;
          document.querySelector(
            ".download-image-area"
          ).innerHTML += `<a href="${alldata.music.playUrl}" download class="btn bg-primary-subtle rounded my-1 mt-3 w-100">DOWNLOAD AUDIO/MP3</a>`;
        } else {
          // params.set('ld', toString(UrlQuery));
          document.querySelector(".download-section").innerHTML =
            Video_fragment(Response.result.result);
        }
      });
    document.querySelector(".download-section").innerHTML =
      await loading_fragment();
  }
});
document.querySelector("#clipboard-btn").addEventListener("click", () => {
  if (navigator.clipboard) {
    navigator.clipboard.readText().then((text) => {
      const targetElement = document.querySelector("#query-download");
      targetElement.value = text;
    });
  } else {
    alert("Clipboardnya kosong wak!");
  }
});
document.querySelector("#refresh-btn").addEventListener("click", () => {
  window.location.href = '/';
});

// <p class="vid-content">Like : ${m.statistics.likeCount} Comment : ${m.statistics.commentCount} Share : ${m.statistics.shareCount}</p>

function Video_fragment(m) {
  return `<div class="container download-video-area">
                <hr class="container">
                <div class="row g-0 text-center mt-4">
                    <div class="col-6 col-md-4 device-center">
                        <h4 class="salsa-font">Video Details:</h4>
                        <img src="${m.author.avatarThumb[0]}" alt="" class="w-50 h-50 rounded-circle mb-2">
                        <p class="vid-content fw-bold">${m.author.nickname}</p>
                        <p class="vid-content">${m.description}</p>
                    </div>
                    <div class="col-sm-6 col-md-8">
                        <h4 class="salsa-font">Download Video:</h4>
                        <ul class="list-group">
                            <li class="list-group-item">
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                    Top!
                                    <span class="visually-hidden">unread messages</span>
                                </span>
                                <a href="${m.video.playAddr[0]}" download="tiktokbykenn/lovyuuu!<3" class="btn bg-primary-subtle rounded my-1 w-50">DOWNLOAD VIDEO/MP4</a>
                            </li>
                            <li class="list-group-item">
                                <a href="${m.video.playAddr[1]}" download="tiktokbykenn/lovyuuu!<3" class="btn bg-primary-subtle rounded my-1 w-50">
                                DOWNLOAD VIDEO/MP4 [2]
                                </a>
                            </li>
                            <li class="list-group-item">
                                <a href="${m.video.downloadAddr}" download="tiktokbykenn/lovyuuu!<3" class="btn bg-primary-subtle rounded my-1 w-50">DOWNLOAD VIDEO/MP4 [WATERMARK]</a>
                            </li>
                            <li class="list-group-item">
                                <a href="${m.music.playUrl[0]}" download="lovyuuu!<3"  class="btn bg-primary-subtle rounded my-1 w-50">DOWNLOAD AUDIO/MP3</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`;
}
function Audio_fragment(a) {
  return `<div class="container download-video-area">
                <hr class="container">
                <div class="row g-0 text-center mt-4">
                    <div class="col-sm-6 col-md-8 mx-auto">
                        <h4 class="salsa-font">Download Audio:</h4>
                        <ul class="list-group">
                            <li class="list-group-item">
                                <audio src="${a.video2}" controls></audio>
                            </li>
                            <li class="list-group-item">
                                <a href="${a.video1}" download="tiktokbykenn/lovyuuu!<3" class="btn bg-primary-subtle rounded my-1 w-50">DOWNLOAD AUDIO/MP3</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`;
}
function Images_Fragment(i) {
  return `<div class="col">
                    <div class="card">
                        <img src="${i}" class="card-img-top">
                        <div class="card-body">
                            <a href="${i}" download class="btn bg-primary-subtle rounded my-1 w-100">DOWNLOAD PHOTO</a>
                        </div>
                    </div>
                </div>
            </div>`;
}
function loading_fragment() {
  return `<div class="parent-loading d-flex justify-content-center mt-5">
                <div class="spinner-grow text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-danger mx-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>`;
}
