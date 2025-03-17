
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the copy link element
    const copyLink = document.querySelector('.copy a');
    
    // Add click event listener to the copy link
    copyLink.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        
        // Get the booking number text
        const bookingNoElement = document.querySelector('.booking__no');
        const bookingNoText = bookingNoElement.textContent.replace('Booking No. ', '').trim();
        
        // Copy the booking number to clipboard
        navigator.clipboard.writeText(bookingNoText)
            .then(() => {
                // Show success feedback to user
                const originalText = copyLink.textContent;
                copyLink.textContent = 'Copied!';
                
                // Reset text after 2 seconds
                setTimeout(() => {
                    copyLink.textContent = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                
                // Fallback method for older browsers
                fallbackCopyTextToClipboard(bookingNoText);
            });
    });
    
    // Fallback copy method for browsers that don't support clipboard API
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        
        // Make the textarea out of viewport
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
            
            // Show feedback
            copyLink.textContent = 'Copied!';
            setTimeout(() => {
                copyLink.textContent = 'Copy Booking No.';
            }, 2000);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    }
});