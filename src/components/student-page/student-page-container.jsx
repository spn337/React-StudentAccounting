import React from 'react';
import { getSubscribedCoursesTC, getUnSubscribedCoursesTC, subscribeTC, unsubscribeTC }
    from '../../redux/reducers/student-reducer'
import { connect } from 'react-redux';
import StudentPage from './student-page';
import { openUnsubscribeNotification, openSubscribeSuccessedNotification, openSubscribeFailedNotification }
    from '../../helpers/notifications';
import "./student-page.css";


class StudentPageContainer extends React.Component {

    componentDidMount() {
        this.props.getSubscribedCoursesTC();
        this.props.getUnSubscribedCoursesTC();
    }

    componentDidUpdate(prevProps) {

        if ((prevProps.isUnsubscribeSuccess !== this.props.isUnsubscribeSuccess)
            && this.props.isUnsubscribeSuccess) {

            openUnsubscribeNotification()

            this.props.getSubscribedCoursesTC();
            this.props.getUnSubscribedCoursesTC();
        }

        if ((prevProps.isSubscribeSuccess !== this.props.isSubscribeSuccess)
            && this.props.isSubscribeSuccess) {

            openSubscribeSuccessedNotification()

            this.props.getSubscribedCoursesTC();
            this.props.getUnSubscribedCoursesTC();
        }

        if ((prevProps.isSubscribeFailed !== this.props.isSubscribeFailed)
            && this.props.isSubscribeFailed) {

            openSubscribeFailedNotification(this.props.errorMessage)
        }
    }

    handleSubscribe = (courseId, studyDate) => {
        this.props.subscribeTC(courseId, studyDate);
    };

    handleUnsubscribe = (courseId) => {
        this.props.unsubscribeTC(courseId);
    };

    render() {
        return (
            <StudentPage
                {...this.props}
                handleSubscribe={this.handleSubscribe}
                handleUnsubscribe={this.handleUnsubscribe} />
        )
    }
};

const mapStateToProps = (state) => ({
    subscribedCourses: state.studentPage.subscribedCourses,
    unsubscribedCourses: state.studentPage.unsubscribedCourses,
    isSubscribeSuccess: state.studentPage.isSubscribeSuccess,
    isUnsubscribeSuccess: state.studentPage.isUnsubscribeSuccess,
    isSubscribeFailed: state.studentPage.isSubscribeFailed,
    errorMessage: state.studentPage.errorMessage
})

export default connect(mapStateToProps,
    { getSubscribedCoursesTC, getUnSubscribedCoursesTC, subscribeTC, unsubscribeTC })
    (StudentPageContainer);