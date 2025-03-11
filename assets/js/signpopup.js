document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdowns when the page loads
    initCustomDropdowns();
    
    // Add event listeners for sign in/sign up links
    const signInLinks = document.querySelectorAll('a[href="./sign_in.html"]');
    signInLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            loadSignPage('login');
        });
    });

    const signUpLinks = document.querySelectorAll('a[href="./sign_up.html"]');
    signUpLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            loadSignPage('signup');
        });
    });
    
    // Add document click event to close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-dropdown')) {
            closeAllDropdowns();
        }
    });
    
    // Initialize email validation on the signup-step2 page if it exists
    const emailDisplayInput = document.getElementById('email-display');
    if (emailDisplayInput) {
        // Use keyup for real-time validation feedback as the user types
        emailDisplayInput.addEventListener('keyup', function() {
            validateEmailInput(this);
        });
        
        // Also validate when focus is lost
        emailDisplayInput.addEventListener('blur', function() {
            // On blur, show "Please enter your email" if it's empty
            if (!this.value.trim()) {
                const formGroup = this.closest('.form-group');
                const errorMessage = formGroup.querySelector('.error-message');
                
                formGroup.classList.add('error');
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = 'Please enter your email address.';
                }
            } else {
                validateEmailInput(this);
            }
        });
    }
});

// Modified validation function with direct style application
function validateEmailInput(input) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    // Only validate if there's actual content in the field
    if (input.value.trim()) {
        // Check if it's a valid email format
        if (!validateEmail(input.value)) {
            // Show error state immediately when typing an invalid format
            formGroup.classList.add('error');
            
            // Direct style application
            input.style.border = '1px solid #ff3b30';
            
            if (errorMessage) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Invalid email address. Please check and try again.';
            }
        } else {
            // Valid email - remove error state
            formGroup.classList.remove('error');
            
            // Reset border style
            input.style.border = '';
            
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        }
    } else {
        // Empty field - no validation needed yet
        formGroup.classList.remove('error');
        
        // Reset border style
        input.style.border = '';
        
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }
}

// Add this to the document ready function to ensure it's applied
document.addEventListener('DOMContentLoaded', function() {
    // Apply initial validation to any existing email fields
    const emailFields = document.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        field.addEventListener('keyup', function() {
            validateEmailInput(this);
        });
        
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                const formGroup = this.closest('.form-group');
                const errorMessage = formGroup.querySelector('.error-message');
                
                formGroup.classList.add('error');
                this.style.border = '1px solid #ff3b30';
                
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = 'Please enter your email address.';
                }
            } else {
                validateEmailInput(this);
            }
        });
    });
    
    // Make sure to properly initialize the email-display field
    const emailDisplayInput = document.getElementById('email-display');
    if (emailDisplayInput) {
        emailDisplayInput.addEventListener('keyup', function() {
            validateEmailInput(this);
        });
        
        emailDisplayInput.addEventListener('blur', function() {
            if (!this.value.trim()) {
                const formGroup = this.closest('.form-group');
                const errorMessage = formGroup.querySelector('.error-message');
                
                formGroup.classList.add('error');
                this.style.border = '1px solid #ff3b30';
                
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = 'Please enter your email address.';
                }
            } else {
                validateEmailInput(this);
            }
        });
    }
});
// Initialize custom dropdowns - this is a key function that was missing proper implementation
function initCustomDropdowns(container = document) {
    const dropdowns = container.querySelectorAll('.custom-dropdown');
    
    dropdowns.forEach(dropdown => {
        const selectedOption = dropdown.querySelector('.selected-option');
        const optionsContainer = dropdown.querySelector('.dropdown-options');
        
        // Clear any existing options to prevent duplication
        optionsContainer.innerHTML = '';
        
        // Add click event to toggle dropdown
        selectedOption.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close all other dropdowns
            const allOptions = document.querySelectorAll('.dropdown-options');
            allOptions.forEach(options => {
                if (options !== optionsContainer) {
                    options.classList.remove('visible');
                }
            });
            
            // Toggle current dropdown
            optionsContainer.classList.toggle('visible');
        });
        
        // Determine which options to add based on the dropdown text
        const text = selectedOption.textContent.trim();
        const currentYear = new Date().getFullYear();
        
        if (text.includes('Year')) {
            // Year options (current year - 100)
            for (let year = currentYear; year >= currentYear - 100; year--) {
                addOptionToDropdown(optionsContainer, year, selectedOption);
            }
        } else if (text.includes('Month')) {
            // Month options (1-12)
            for (let month = 1; month <= 12; month++) {
                addOptionToDropdown(optionsContainer, month, selectedOption);
            }
        } else if (text.includes('Date')) {
            // Date options (1-31)
            for (let date = 1; date <= 31; date++) {
                addOptionToDropdown(optionsContainer, date, selectedOption);
            }
        }
    });
}

function addOptionToDropdown(optionsContainer, value, selectedElement) {
    const option = document.createElement('div');
    option.className = 'dropdown-option';
    option.textContent = value;
    option.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Update the selected option text and add active class
        const arrowSpan = selectedElement.querySelector('.dropdown-arrow').outerHTML;
        selectedElement.innerHTML = value + ' ' + arrowSpan;
        selectedElement.classList.add('active');
        
        // Hide the dropdown
        optionsContainer.classList.remove('visible');
    });
    optionsContainer.appendChild(option);
}

// Close all dropdowns
function closeAllDropdowns() {
    const allOptions = document.querySelectorAll('.dropdown-options');
    allOptions.forEach(options => {
        options.classList.remove('visible');
    });
}

// Load sign page and display specific popup
function loadSignPage(popupType) {
    fetch('./sign.html')
        .then(response => response.text())
        .then(html => {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'popup-overlay';
            document.body.appendChild(overlay);
            
            // Close popup when clicking overlay
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closePopup();
                }
            });
            
            // Parse HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Get requested popup
            const popup = doc.getElementById(`${popupType}-popup`);
            
            if (popup) {
                // Add popup to overlay
                popup.style.display = 'block';
                overlay.appendChild(popup);
                
                // Add event listeners to close buttons
                const closeButtons = popup.querySelectorAll('.popup-close');
                closeButtons.forEach(button => {
                    button.addEventListener('click', closePopup);
                });
                
                // Prevent background scrolling
                document.body.classList.add('popup-open');
                
                // Add event listener to email input for validation
                if (popupType === 'signup') {
                    const emailInput = popup.querySelector('#signup-email');
                    if (emailInput) {
                        emailInput.addEventListener('keyup', function() {
                            validateEmailInput(this);
                        });
                        
                        emailInput.addEventListener('blur', function() {
                            validateEmailField(this);
                        });
                    }
                }
                
                // Add event listeners to terms links
                const termsLinks = popup.querySelectorAll('.checkbox-group .link');
                termsLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const type = this.getAttribute('data-type') || this.textContent.trim().toLowerCase().replace(/\s+/g, '_');
                        if (type) {
                            showTerms(type);
                        }
                    });
                });
                
                // Initialize custom dropdowns if on signup-step2 page
                if (popupType === 'signup-step2') {
                    initCustomDropdowns(popup);
                    
                    // Initialize email validation for step 2
                    const emailDisplayInput = popup.querySelector('#email-display');
                    if (emailDisplayInput) {
                        // Real-time validation as they type
                        emailDisplayInput.addEventListener('keyup', function() {
                            validateEmailInput(this);
                        });
                        
                        // Also validate when focus is lost
                        emailDisplayInput.addEventListener('blur', function() {
                            if (!this.value.trim()) {
                                const formGroup = this.closest('.form-group');
                                const errorMessage = formGroup.querySelector('.error-message');
                                
                                formGroup.classList.add('error');
                                if (errorMessage) {
                                    errorMessage.style.display = 'block';
                                    errorMessage.textContent = 'Please enter your email address.';
                                }
                            } else {
                                validateEmailInput(this);
                            }
                        });
                    }
                }
                
                // Execute scripts
                executeScripts(doc);
            } else {
                console.error(`Popup "${popupType}" not found.`);
                overlay.remove();
            }
        })
        .catch(error => {
            console.error('Error loading popup:', error);
        });
}

// Switch between popups
function showPopup(popupType) {
    // Get current overlay
    const overlay = document.querySelector('.popup-overlay');
    
    if (!overlay) {
        // Load new page if overlay doesn't exist
        loadSignPage(popupType);
        return;
    }
    
    // Hide current popup
    const currentPopup = overlay.querySelector('.sign-popup[style*="display: block"]');
    if (currentPopup) {
        currentPopup.style.display = 'none';
    }
    
    // Get new popup from sign.html
    fetch('./sign.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Get requested popup
            const popup = doc.getElementById(`${popupType}-popup`);
            
            if (popup) {
                // Remove existing popup
                const oldPopup = overlay.querySelector('.sign-popup');
                if (oldPopup) {
                    overlay.removeChild(oldPopup);
                }
                
                // Add new popup to overlay
                popup.style.display = 'block';
                overlay.appendChild(popup);
                
                // Add event listeners to close buttons
                const closeButtons = popup.querySelectorAll('.popup-close');
                closeButtons.forEach(button => {
                    button.addEventListener('click', closePopup);
                });
                
                // Transfer email value if moving to step 2
                if (popupType === 'signup-step2') {
                    const signupEmailInput = document.getElementById('signup-email');
                    if (signupEmailInput && signupEmailInput.value) {
                        const email = signupEmailInput.value;
                        const emailInput = popup.querySelector('#email-display');
                        if (emailInput) {
                            emailInput.value = email;
                            
                            // Validate the transferred email
                            validateEmailInput(emailInput);
                        }
                    }
                    
                    // Initialize custom dropdowns
                    initCustomDropdowns(popup);
                    
                    // Initialize email validation for step 2
                    const emailDisplayInput = popup.querySelector('#email-display');
                    if (emailDisplayInput) {
                        // Real-time validation
                        emailDisplayInput.addEventListener('keyup', function() {
                            validateEmailInput(this);
                        });
                        
                        // Also validate when focus is lost
                        emailDisplayInput.addEventListener('blur', function() {
                            if (!this.value.trim()) {
                                const formGroup = this.closest('.form-group');
                                const errorMessage = formGroup.querySelector('.error-message');
                                
                                formGroup.classList.add('error');
                                if (errorMessage) {
                                    errorMessage.style.display = 'block';
                                    errorMessage.textContent = 'Please enter your email address.';
                                }
                            } else {
                                validateEmailInput(this);
                            }
                        });
                    }
                }
                
                // Add event listeners to terms links
                const termsLinks = popup.querySelectorAll('.checkbox-group .link');
                termsLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const type = this.getAttribute('data-type') || this.textContent.trim().toLowerCase().replace(/\s+/g, '_');
                        if (type) {
                            showTerms(type);
                        }
                    });
                });
                
                // Execute scripts
                executeScripts(doc);
            } else {
                console.error(`Popup "${popupType}" not found.`);
            }
        })
        .catch(error => {
            console.error('Error switching popup:', error);
        });
}

// Close popup
function closePopup() {
    const overlay = document.querySelector('.popup-overlay');
    if (overlay) {
        document.body.removeChild(overlay);
        document.body.classList.remove('popup-open');
    }
}

// Validate email field
function validateEmailField(input) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (!input.value) {
        formGroup.classList.add('error');
        if (errorMessage) {
            errorMessage.textContent = 'Please enter your email address.';
            errorMessage.style.display = 'block';
        }
        return false;
    } else if (!validateEmail(input.value)) {
        formGroup.classList.add('error');
        if (errorMessage) {
            errorMessage.textContent = 'Invalid email address. Please check and try again.';
            errorMessage.style.display = 'block';
        }
        return false;
    } else {
        formGroup.classList.remove('error');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
        return true;
    }
}

// Email validation function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Continue to signup step 2
function continueSignUp() {
    const emailInput = document.getElementById('signup-email');
    if (emailInput) {
        // Empty email field
        if (!emailInput.value.trim()) {
            const formGroup = emailInput.closest('.form-group');
            formGroup.classList.add('error');
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.textContent = 'Please enter your email address.';
                errorMessage.style.display = 'block';
            }
            
            // Add alert
            alert('Please enter your email address.');
            return;
        }
        
        // Invalid email format
        if (!validateEmail(emailInput.value)) {
            const formGroup = emailInput.closest('.form-group');
            formGroup.classList.add('error');
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.textContent = 'Invalid email address. Please check and try again.';
                errorMessage.style.display = 'block';
            }
            
            // Add alert
            alert('Invalid email address. Please check and try again.');
            return;
        }
        
        // Proceed to next step if email is valid
        showPopup('signup-step2');
    } else {
        console.error('Email input field not found.');
    }
}

// Complete signup
function completeSignUp() {
    const password = document.getElementById('signup-password');
    const confirmPassword = document.getElementById('confirm-password');
    const fullName = document.getElementById('full-name');
    const termsAgree = document.getElementById('terms-agree');
    
    if (!password || !confirmPassword || !fullName || !termsAgree) {
        alert('Form elements not found. Please try again.');
        return;
    }
    
    if (!password.value || !confirmPassword.value || !fullName.value) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (password.value !== confirmPassword.value) {
        alert('Passwords do not match');
        return;
    }
    
    if (!termsAgree.checked) {
        alert('Please agree to the Terms of Use and Privacy Policy');
        return;
    }
    
    // Get birth date values from custom dropdowns
    let birthYear = '', birthMonth = '', birthDate = '';
    
    const yearElement = document.querySelector('.custom-dropdown:nth-child(1) .selected-option');
    const monthElement = document.querySelector('.custom-dropdown:nth-child(2) .selected-option');
    const dateElement = document.querySelector('.custom-dropdown:nth-child(3) .selected-option');
    
    if (yearElement && yearElement.classList.contains('active')) {
        birthYear = yearElement.textContent.replace(/[^\d]/g, '').trim();
    }
    
    if (monthElement && monthElement.classList.contains('active')) {
        birthMonth = monthElement.textContent.replace(/[^\d]/g, '').trim();
    }
    
    if (dateElement && dateElement.classList.contains('active')) {
        birthDate = dateElement.textContent.replace(/[^\d]/g, '').trim();
    }
    
    // Show signup complete popup
    showPopup('signup-complete');
}

// Execute scripts from HTML
function executeScripts(doc) {
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => {
        if (script.textContent) {
            try {
                eval(script.textContent);
            } catch (error) {
                console.error('Error executing script:', error);
            }
        }
    });
}

// Show terms and conditions popup
function showTerms(type) {
    // Save current overlay state
    const currentOverlay = document.querySelector('.popup-overlay');
    const currentPopup = currentOverlay ? currentOverlay.querySelector('.sign-popup[style*="display: block"]') : null;
    const currentPopupId = currentPopup ? currentPopup.id : null;
    
    // Create new overlay
    const termsOverlay = document.createElement('div');
    termsOverlay.className = 'popup-overlay terms-overlay';
    
    // Create popup
    const termsPopup = document.createElement('div');
    termsPopup.className = 'popup-container';
    termsPopup.style.backgroundColor = '#fff';
    termsPopup.style.width = '600px';
    termsPopup.style.maxWidth = '90%';
    termsPopup.style.maxHeight = '80vh';
    termsPopup.style.overflowY = 'auto';
    
    // Set popup content
    termsPopup.innerHTML = `
        <div class="popup-header">
            <div class="popup-header__inner">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="popup-close terms-close">
                    <path d="M17 1L8.99968 9.03705M8.99968 9.03705L1.07377 16.9994M8.99968 9.03705L16.9262 17M8.99968 9.03705L1 1.00065" stroke="#797979"/>
                </svg>
            </div>
        </div>
        <iframe src="./${type}.html" style="width:100%; height:80vh; border:none;"></iframe>
    `;
    
    // Add popup to overlay
    termsOverlay.appendChild(termsPopup);
    document.body.appendChild(termsOverlay);
    
    // Prevent background scrolling
    document.body.classList.add('popup-open');
    
    // Close terms popup when clicking overlay
    termsOverlay.addEventListener('click', function(e) {
        if (e.target === termsOverlay) {
            closeTermsPopup();
        }
    });
    
    // Add event listener to close button
    const closeButton = termsPopup.querySelector('.terms-close');
    if (closeButton) {
        closeButton.addEventListener('click', closeTermsPopup);
    }
    
    // Close terms popup function
    function closeTermsPopup() {
        document.body.removeChild(termsOverlay);
        
        // Keep original signup popup displayed
        if (currentPopup) {
            currentPopup.style.display = 'block';
        }
    }
}