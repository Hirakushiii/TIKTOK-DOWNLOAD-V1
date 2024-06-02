document.querySelector('#download-btn').addEventListener('click', async ()=>{
    let UrlQuery = document.querySelector('#query-download');
    if(UrlQuery.value === ''){
        return Swal.fire({
            title: "Ahhh?",
            text: "Kemana perginya link tiktokmu?",
            icon: "question"
            });
    }else if(!UrlQuery.value.includes('tiktok.com')){
        Swal.fire({
            title: "Upsss!",
            text: "Kamu memasukkan link url yang salah bro! :>",
            icon: "error"
        });
    }
    else{
        let apikey = 'https://api.nyx.my.id/dl/tiktok?url='
        fetch(`${apikey}${UrlQuery.value}`)
            .then((response) =>{
                if (!response.ok){
                    console.error(response.statusText);
                };
                return response.json();
            }).then((Response) =>{
                // console.log(Response.result);
                document.querySelector('.download-area').innerHTML = fragment(Response.result);
            });
            document.querySelector('.download-area').innerHTML = await loading_fragment();
            UrlQuery.value = '';
    }
})
document.querySelector('#clipboard-btn').addEventListener('click', ()=>{
    if (navigator.clipboard) {
        navigator.clipboard.readText().then(text => {
            const targetElement = document.querySelector('#query-download');
            targetElement.value = text;
        });
    } else {
        alert('Clipboardnya kosong wak!');
    }
})

function fragment(m){
    return `<hr class="container">
            <div class="row g-0 text-center mt-4">
                <div class="col-6 col-md-4 device-center">
                    <h4 class="salsa-font">Video Details:</h4>
                    <img src="${m.author.avatar}" alt="" class="w-50 h-50 rounded-circle mb-2">
                    <p class="account-name">${m.author.nickname}</p>
                    <p class="vid-content">${m.desc}</p>
                </div>
                <div class="col-sm-6 col-md-8">
                    <h4 class="salsa-font">Download Video:</h4>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <a href="${m.video1}" download="tiktokbykenn/lovyuuu!<3" class="btn bg-primary-subtle rounded my-1 w-50">DOWNLOAD VIDEO/MP4</a>
                        </li>
                        <li class="list-group-item">
                            <a href="${m.video2}" download="tiktokbykenn/lovyuuu!<3" class="btn bg-primary-subtle rounded my-1 w-50">DOWNLOAD VIDEO/MP4 [2]</a>
                        </li>
                        <li class="list-group-item">
                            <a href="${m.video_hd}" download="tiktokbykenn/lovyuuu!<3" class="btn bg-primary-subtle rounded my-1 w-50">DOWNLOAD VIDEO/MP4 [HD]</a>
                        </li>
                        <li class="list-group-item">
                            <a href="${m.video_watermark}" download="tiktokbykenn/lovyuuu!<3" class="btn bg-primary-subtle rounded my-1 w-50">DOWNLOAD VIDEO/MP4 [WATERMARK]</a>
                        </li>
                        <li class="list-group-item">
                            <a href="${m.music}" download="tiktokbykenn/lovyuuu!<3" class="btn bg-primary-subtle rounded my-1 w-50">DOWNLOAD AUDIO/MP3</a>
                        </li>
                    </ul>
                </div>
            </div>`;
};
function loading_fragment(){
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