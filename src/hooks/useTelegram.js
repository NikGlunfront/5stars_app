const tg = window.Telegram.WebApp;

export function useTelegram() {
    const devTelegramId = 658318611
    // const devTelegramId = 1320;
    // const devTelegramId = 132033;

    const onClose = () => {
        tg.close()
    }
    
    const onToggleButton = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }

    const showTgButton = (text) => {
        tg.MainButton.show()
        tg.MainButton.text = text
        disableTgButton()
    }

    const hideTgButton = () => {
        tg.MainButton.hide()
    }
    const disableTgButton = () => {
        tg.MainButton.disable()
    }

    const vibrate1ALert = () => {
        tg.HapticFeedback.impactOccurred('heavy')
    }
    const vibrate2ALert = () => {
        tg.HapticFeedback.impactOccurred('rigid')
    }
    const vibrate3ALert = () => {
        tg.HapticFeedback.impactOccurred('success')
    }
    const vibrate4ALert = () => {
        tg.HapticFeedback.notificationOccurred('error')
    }
    const vibrate5ALert = () => {
        tg.HapticFeedback.impactOccurred('warning')
    }

    const handleMainButtonClick = (callback) => {
        tg.MainButton.onClick(callback)
    }

    const handleMainButtonOffEventClick = (callback) => {
        tg.MainButton.offClick(callback)
    }

    const enableTgButton = () => {
        tg.MainButton.enable()
    }

    const sendDataToBot = (data) => {
        tg.sendData(data)
    }

    const sendAlert = (text) => {
        if (tg.initDataUnsafe?.user) {
            tg.showAlert(text)
        } else {
            alert(text)
        }
    }

    const requestConfirmation = (text) => {
        if (tg.initDataUnsafe?.user) {
            tg.showConfirm(text)
        } else {
            alert(text)
        }
    }

    const requestContact = async () => {
        let result = await tg.requestContact(function(objectPhone) {
            return objectPhone
        })
        return result
    }

    return {
        onClose,
        onToggleButton,
        sendDataToBot,
        sendAlert,
        requestContact,
        requestConfirmation,
        disableTgButton,
        showTgButton,
        hideTgButton,
        enableTgButton,
        handleMainButtonClick,
        vibrate1ALert,
        vibrate2ALert,
        vibrate3ALert,
        vibrate4ALert,
        vibrate5ALert,
        handleMainButtonOffEventClick,
        tg,
        user: tg.initDataUnsafe?.user?.id ? tg.initDataUnsafe?.user?.id : devTelegramId,
        queryId: tg.initDataUnsafe?.query_id
    }
}
