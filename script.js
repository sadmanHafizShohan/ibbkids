// WhatsApp Direct Chat
function openWhatsApp() {
    const message = "আস্সালামুয়ালাইকুম! আমি Kids Magic Book সম্পর্কে আরও জানতে চাই।";
    const phoneNumber = "8801XXXXXXXXX"; // Replace with actual number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Simulate Live Chat (can be replaced with actual chat widget)
function startLiveChat() {
    alert("আমাদের সাপোর্ট টিম এখনই আপনার সেবায় নিয়োজিত। কিভাবে সাহায্য করতে পারি?");
}

// Package Selection
function selectPackage(element) {
    document.querySelectorAll('.radio-option').forEach(opt => opt.classList.remove('checked'));
    element.classList.add('checked');
    const radio = element.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
}

// Quantity Control
function changeQty(delta) {
    const input = document.getElementById('quantity');
    if (!input) return;
    let val = parseInt(input.value) || 1;
    val = Math.min(10, Math.max(1, val + delta));
    input.value = val;
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.style.display = 'none';
}

// Google Sheets Script URL — replace with your own
const scriptURL = 'https://script.google.com/macros/s/AKfycbx6W4qP3Bc4q3wq6KToybs-BX6rW3uhcr95gVM8uVuvWBsnsGn0r7LC06K6NnFGC28FDA/exec';

const form = document.getElementById('orderForm');
const loadingOverlay = document.getElementById('loadingOverlay');
const successModal = document.getElementById('successModal');
const msg = document.getElementById('msg');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        // Validate package selection
        const selectedPackage = form.querySelector('input[name="package"]:checked');
        if (!selectedPackage) {
            if (msg) {
                msg.textContent = '⚠️ অনুগ্রহ করে একটি প্যাকেজ নির্বাচন করুন।';
                msg.style.color = '#FF4757';
            }
            return;
        }

        if (loadingOverlay) loadingOverlay.style.display = 'flex';
        if (msg) msg.textContent = '';

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(() => {
                if (loadingOverlay) loadingOverlay.style.display = 'none';
                if (successModal) successModal.style.display = 'flex';
                form.reset();
                document.querySelectorAll('.radio-option').forEach(opt => opt.classList.remove('checked'));
            })
            .catch(error => {
                if (loadingOverlay) loadingOverlay.style.display = 'none';
                if (msg) {
                    msg.textContent = '❌ দুঃখিত! সমস্যা হয়েছে। আবার চেষ্টা করুন।';
                    msg.style.color = '#FF4757';
                }
                console.error('Error:', error.message);
            });
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Show sticky footer on scroll
window.addEventListener('scroll', () => {
    const stickyFooter = document.querySelector('.sticky-footer');
    if (!stickyFooter) return;
    // Already shown via CSS media query for mobile, but also show after scrolling past hero on desktop
    if (window.innerWidth > 768) {
        stickyFooter.style.display = window.scrollY > 400 ? 'flex' : 'none';
    }
});

// Close modal on backdrop click
document.getElementById('successModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});
