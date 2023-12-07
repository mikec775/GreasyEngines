document.addEventListener('DOMContentLoaded', function () {
      const queryParams = new URLSearchParams(window.location.search);
      const registrationStatus = queryParams.get('registration');
    
      if (registrationStatus === 'success') {
        alert('User registered successfully');
      } else if (registrationStatus === 'failed') {
        alert('Server Error. Create Failed');
      }
});

    