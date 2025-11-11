// ===================================
// Smooth Scroll to Offers Section
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const buyNowBtn = document.getElementById('buyNowBtn');
    const offersSection = document.getElementById('offersSection');
    
    if (buyNowBtn && offersSection) {
        buyNowBtn.addEventListener('click', function() {
            offersSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // ===================================
    // Buy Button Functionality
    // ===================================
    const buyButtons = document.querySelectorAll('.btn-buy');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const price = this.getAttribute('data-price');
            const packageName = this.getAttribute('data-package');
            
            // Log to console for now (will be replaced with STK push later)
            console.log(`Buying Ksh ${price} offer - ${packageName}`);
            
            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.disabled = true;
            
            // Simulate processing (remove this when implementing real STK push)
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                
                // Show alert for user feedback (temporary)
                alert(`Order initiated!\n\nPackage: ${packageName}\nAmount: Ksh ${price}\n\nYou will receive an M-PESA prompt shortly.`);
            }, 1000);
        });
    });

    // ===================================
    // Add Entrance Animation on Scroll
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe offer cards for animation
    const offerCards = document.querySelectorAll('.offer-card');
    offerCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // ===================================
    // Till Number Copy Functionality
    // ===================================
    const tillNumber = document.querySelector('.till-number');
    
    if (tillNumber) {
        tillNumber.style.cursor = 'pointer';
        tillNumber.title = 'Click to copy Till Number';
        
        tillNumber.addEventListener('click', function() {
            const tillValue = document.querySelector('.till-value').textContent;
            
            // Copy to clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(tillValue)
                    .then(() => {
                        showCopyFeedback(tillNumber);
                    })
                    .catch(err => {
                        console.error('Failed to copy:', err);
                    });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = tillValue;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showCopyFeedback(tillNumber);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
                document.body.removeChild(textArea);
            }
        });
    }

    function showCopyFeedback(element) {
        const originalBg = element.style.backgroundColor;
        element.style.backgroundColor = 'rgba(16, 185, 129, 0.3)';
        
        const feedback = document.createElement('span');
        feedback.textContent = '✓ Copied!';
        feedback.style.cssText = `
            position: absolute;
            background: #10B981;
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-left: 10px;
            animation: fadeOut 2s ease;
        `;
        
        element.style.position = 'relative';
        element.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
            element.style.backgroundColor = originalBg;
        }, 2000);
    }

    // ===================================
    // Add CSS Animation for Copy Feedback
    // ===================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; transform: translateY(0); }
            70% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
});

// ===================================
// Function to initiate M-PESA STK Push
// (Placeholder for future backend integration)
// ===================================
async function initiateMpesaPayment(phoneNumber, amount, package) {
    // This will be implemented when backend is ready
    console.log('Initiating M-PESA payment:', { phoneNumber, amount, package });
    
    // Future implementation will make API call to backend
    // const response = await fetch('/api/mpesa/stkpush', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ phoneNumber, amount, package })
    // });
    // const data = await response.json();
    // return data;
}

