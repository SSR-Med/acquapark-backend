export const timezoned = () => {
    return new Date().toLocaleString('en-GB', {
      timeZone: 'America/Bogota'
    });
}