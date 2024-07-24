
export async function ClearStorage() {
    sessionStorage.clear();
    sessionStorage.removeItem("loginName");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("accountType");
    // window.location.reload();
};

// Example usage
// var token = "your_token_value_here";
// setCookie("token", token, 30); // Setting the token with a 30-day expiration

// Function to set a cookie
export function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Strict"; // Adding SameSite attribute for security
}


// var token = getCookie("token");
// console.log(token); // Output the token value
// Function to get a cookie value by name
export async function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}



  