
export function isLoggedIn() {

    let token = localStorage.getItem('token')
    
    if(token) {
        return true
    } else {
        return false
    }
}