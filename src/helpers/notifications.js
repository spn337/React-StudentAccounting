import {
    notification
} from "antd"

export const openRegistrationNotification = () => {
    notification.info({
        top: 80,
        message: "Registration success.",
        description: "Check your e-mail to confirm",
        placement: "topLeft"
    })
}

export const openConfirmEmailNotification = () => {
    notification.success({
        top: 80,
        message: "Email is confirmed",
        description: "You can login to your account",
        placement: "topLeft"
    })
}

export const openChangeUserNotification = (description) => {
    notification.info({
        top: 80,
        message: "Success",
        description
    })
}

export const openSubscribeSuccessedNotification = () => {
    notification.success({
        top: 80,
        message: "Congratulations",
        description: "You are subscribed to this course. We'll send you a reminder to start a course"
    })
}

export const openSubscribeFailedNotification = (error) => {
    notification.error({
        top: 80,
        message: "Sorry",
        description: error
    })
}

export const openUnsubscribeNotification = () => {
    notification.info({
        top: 80,
        message: "Success",
        description: "You are not subscribed to this course anymore"
    })
}

export const openErrorNotification = () => {
    notification.error({
        top: 80,
        message: "Oops",
        description: "Something was wrong.Try again later"
    })
}