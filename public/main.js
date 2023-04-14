const input = document.getElementById('upload');
const fileReader = new FileReader();

async function init() {
    let rustApp = null;

    try {
        rustApp = await import('../pkg');//* This will make calling RUST functions using JS is possible

    } catch (error) {
        console.error(error);
        return;
    }

    // console.log(rustApp);

    input.addEventListener('change', () => {
        fileReader.readAsDataURL(input.files[0])
    })

    fileReader.onloadend = () => {
        let base64 = fileReader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')

        let img_data_url = rustApp.grayscale(base64);

        document.getElementById('new-img').setAttribute('src', img_data_url);
    }

    
}

init();