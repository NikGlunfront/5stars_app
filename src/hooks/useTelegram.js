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

    const handleMainButtonClick = (callback) => {
        tg.MainButton.onClick(callback)
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
        tg,
        user: devTGID | tg.initDataUnsafe?.user?.id,
        queryId: tg.initDataUnsafe?.query_id
    }
}
