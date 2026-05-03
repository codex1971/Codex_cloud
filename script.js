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
    formData.append('file', file);

    try {
        // এই API টি কোনো প্রক্সি ছাড়াই সরাসরি গিটহাবে কাজ করে (Gofiles API)
        const response = await fetch('https://store1.gofiles.io/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.status === true) {
            resultDiv.style.display = 'block';
            downloadLinkInput.value = data.data.download_url; // সরাসরি ডাউনলোড লিংক
            uploadBtn.innerText = "সফল হয়েছে!";
            uploadBtn.disabled = false;
        } else {
            throw new Error("Upload Failed");
        }
    } catch (error) {
        console.error(error);
        // যদি উপরেরটি কাজ না করে, বিকল্প আর একটি সহজ মেথড
        uploadBtn.innerText = "বিকল্প চেষ্টা হচ্ছে...";
        
        try {
            const res2 = await fetch('https://file.io', {
                method: 'POST',
                body: formData
            });
            const data2 = await res2.json();
            if(data2.success) {
                resultDiv.style.display = 'block';
                downloadLinkInput.value = data2.link;
                uploadBtn.innerText = "সফল হয়েছে!";
            } else {
                alert("সবগুলো সার্ভার বিজি। কিছুক্ষণ পর চেষ্টা করুন।");
            }
        } catch (e) {
            alert("আপনার ইন্টারনেট বা সার্ভারে সমস্যা হচ্ছে।");
        }
        
        uploadBtn.disabled = false;
        uploadBtn.innerText = "আবার চেষ্টা করুন";
    }
};

function copyLink() {
    downloadLinkInput.select();
    document.execCommand('copy');
    alert("লিংক কপি হয়েছে!");
}
