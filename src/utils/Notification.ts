export function showNotificationOrAlert(message: string) {
    if (!('Notification' in window))
        alert("Este browser não suporta notificações de Desktop");

    if (Notification.permission === 'denied') {
        Notification.requestPermission(permission => {
            if (permission !== 'granted')
                alert('O sistema precisa enviar notificações')
        })
    }

    else
        new Notification(message)
}