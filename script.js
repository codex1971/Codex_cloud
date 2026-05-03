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
        // ফাইল আপলোড করার জন্য একটি ফ্রি এবং শক্তিশালী API ব্যবহার করছি
        const response = await fetch('https://file.io', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // রেজাল্ট বক্স দেখানো এবং লিংক বসানো
            resultDiv.style.display = 'block';
            downloadLinkInput.value = data.link; // এটিই আপনার জেনারেট করা লিংক
            uploadBtn.innerText = "সফল হয়েছে!";
        } else {
            alert("আপলোড ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
            uploadBtn.innerText = "লিংক জেনারেট করুন";
            uploadBtn.disabled = false;
        }
    } catch (error) {
        alert("সার্ভার সমস্যা! ইন্টারনেটে কানেকশন চেক করুন।");
        uploadBtn.innerText = "আবার চেষ্টা করুন";
        uploadBtn.disabled = false;
    }
};

// লিংক কপি করার ফাংশন
function copyLink() {
    downloadLinkInput.select();
    document.execCommand('copy');
    alert("লিংক কপি হয়েছে!");
}

