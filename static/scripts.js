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

            const formData = new FormData(loginForm);

            fetch('/login', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/dashboard';
                } else {
                    alert('Invalid credentials, please try again.');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Handle sign-up form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(signupForm);

            fetch('/signup', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/userinfo';
                } else {
                    alert('Signup failed, please try again.');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Handle user info form submission
    const userInfoForm = document.getElementById('userinfo-form');
    if (userInfoForm) {
        userInfoForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(userInfoForm);

            fetch('/userinfo', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/dashboard';
                } else {
                    alert('Failed to update user info, please try again.');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Display user data on dashboard
    if (window.location.pathname.includes('/dashboard')) {
        fetch('/userinfo')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('display-username').textContent = data.username;
                document.getElementById('display-email').textContent = data.email;
                document.getElementById('display-bio').textContent = data.bio;
                if (data.profile_picture) {
                    document.getElementById('profile-pic').src = data.profile_picture;
                }
                if (data.events) {
                    const eventsList = document.getElementById('events-list');
                    eventsList.textContent = data.events;
                }
            } else {
                console.error('Failed to load user info');
            }
        })
        .catch(error => console.error('Error:', error));
    }
});
