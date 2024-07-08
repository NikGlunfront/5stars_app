const tg = window.Telegram.WebApp;

export function useTelegram() {

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
    const disableTgButton = () => {
        tg.MainButton.disable()
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
        enableTgButton,
        tg,
        user: tg.initDataUnsafe?.user.id,
        queryId: tg.initDataUnsafe?.query_id
    }
}