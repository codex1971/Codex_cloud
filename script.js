const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const resultDiv = document.getElementById('result');
const downloadLinkInput = document.getElementById('download-link');

uploadBtn.onclick = async () => {
    const file = fileInput.files[0];
    if (!file) {
        alert("আগে একটি ফাইল সিলেক্ট করুন!");
        return;
    }

    uploadBtn.innerText = "লিংক তৈরি হচ্ছে...";
    uploadBtn.disabled = true;

    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('userhash', ''); // এটি খালি থাকলেও সমস্যা নেই
    formData.append('fileToUpload', file);

    try {
        // আমরা এখন Catbox API ব্যবহার করছি যা গিটহাবে ভালো কাজ করে
        const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://catbox.moe/user/api.php'), {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const link = await response.text();
            resultDiv.style.display = 'block';
            downloadLinkInput.value = link; // সরাসরি ডাউনলোড লিংক
            uploadBtn.innerText = "সফল হয়েছে!";
            uploadBtn.disabled = false;
        } else {
            throw new Error("Upload Failed");
        }
    } catch (error) {
        console.error(error);
        alert("লিংক তৈরি করতে সমস্যা হচ্ছে। অন্য একটি ফাইল ট্রাই করুন।");
        uploadBtn.innerText = "আবার চেষ্টা করুন";
        uploadBtn.disabled = false;
    }
};

function copyLink() {
    downloadLinkInput.select();
    document.execCommand('copy');
    alert("লিংক কপি হয়েছে!");
}
