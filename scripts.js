            window.addEventListener('scroll', () => {
                const heroImage = document.querySelector('.flipped-image');

                if (window.scrollY > 0) {
                    heroImage.classList.add('blur-on-scroll');
                } else {
                    heroImage.classList.remove('blur-on-scroll');
                }
            });

            document.addEventListener('DOMContentLoaded', () => {
                const header = document.getElementById('header');
                const heroText = document.querySelector('.hero-text h1');

                window.addEventListener('scroll', () => {
                    // Fixed Header
                    if (window.scrollY > 0) {
                        header.classList.add('fixed-header');
                    } else {
                        header.classList.remove('fixed-header');
                    }

                    // Text Size Increase
                    const scrollPosition = window.scrollY;
                    const newSize = 6 + (scrollPosition * 0.005); // Adjust the rate of text size change

                    heroText.style.fontSize = newSize + 'rem';
                });

                // Handle login form submission
                const loginForm = document.getElementById('login-form');
                if (loginForm) {
                    loginForm.addEventListener('submit', function (event) {
                        event.preventDefault();

                        const username = document.getElementById('username').value;
                        const password = document.getElementById('password').value;

                        // Mock authentication check
                        if (username === 'john' && password === 'doe123') {
                            // On successful login, redirect to dashboard
                            window.location.href = 'dashboard.html';
                        } else {
                            alert('Invalid credentials, please try again.');
                        }
                    });
                }

                // Handle sign-up form submission
                const signupForm = document.getElementById('signup-form');
                if (signupForm) {
                    signupForm.addEventListener('submit', function (event) {
                        event.preventDefault();

                        const username = document.getElementById('username').value;
                        const email = document.getElementById('email').value;
                        const password = document.getElementById('password').value;

                        // Save user data to localStorage (mocking database)
                        localStorage.setItem('username', username);
                        localStorage.setItem('email', email);
                        localStorage.setItem('password', password);

                        // Redirect to user info page
                        window.location.href = 'userinfo.html';
                    });
                }

                // Handle user info form submission
                const userInfoForm = document.getElementById('userinfo-form');
                if (userInfoForm) {
                    userInfoForm.addEventListener('submit', function (event) {
                        event.preventDefault();

                        const profilePicture = document.getElementById('profile-picture').files[0];
                        const bio = document.getElementById('bio').value;
                        const events = document.getElementById('events').value;

                        // Save additional user data to localStorage
                        localStorage.setItem('bio', bio);
                        localStorage.setItem('events', events);

                        // Handle profile picture upload (this is a mock; real implementation would require server-side handling)
                        if (profilePicture) {
                            const reader = new FileReader();
                            reader.onload = function (e) {
                                localStorage.setItem('profile-picture', e.target.result);
                                window.location.href = 'dashboard.html';
                            };
                            reader.readAsDataURL(profilePicture);
                        } else {
                            window.location.href = 'dashboard.html';
                        }
                    });
                }

                // Display user data on dashboard
                if (window.location.pathname.includes('dashboard.html')) {
                    const username = localStorage.getItem('username');
                    const email = localStorage.getItem('email');
                    const bio = localStorage.getItem('bio');
                    const events = localStorage.getItem('events');
                    const profilePicture = localStorage.getItem('profile-picture');

                    document.getElementById('display-username').textContent = username;
                    document.getElementById('display-email').textContent = email;
                    document.getElementById('display-bio').textContent = bio;
                    if (profilePicture) {
                        document.getElementById('profile-pic').src = profilePicture;
                    }
                    if (events) {
                        const eventsList = document.getElementById('events-list');
                        eventsList.textContent = events;
                    }
                }
            });
