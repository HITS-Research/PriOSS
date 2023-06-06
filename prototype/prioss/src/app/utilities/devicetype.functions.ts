

/**
  * This method returns the device type based on user agent name
  *
  * @author: Mayank (mayank@mail.upb.de)
  *
  */ 
export function getDeviceNameBasedOnUserAgent(user_agent: string): string {
    if(user_agent.includes("Mac OS")) {
        return "Macbook"
    } else if (user_agent.includes("iPhone")) {
        return "iPhone"
    } else if (user_agent.includes("Android")) {
        return "Android"
    } else if (user_agent.match(/(Chrome)|(Safari)/g)) {
        return "Webbrowser"
    }
    return "Unknown Device"
}