const tg = window.Telegram.WebApp;

export function useTelegram() {

    // const devTGID = 1320;
    // const devTGID = 132033;
    const devTGID = false;

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
        tg.onEvent('mainButtonClicked', callback)
    }

    const handleMainButtonOffEventClick = (callback) => {
        tg.offEvent('mainButtonClicked', callback)
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
        user: devTGID | tg.initDataUnsafe?.user?.id,
        queryId: tg.initDataUnsafe?.query_id
    }
}
