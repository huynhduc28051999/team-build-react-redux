export const URL_BACKEND = process.env.backend || `${window.location.protocol}//${window.location.host.split(':')[0]}:4000`

export const URL_API_LOGIN = '/auth/login'
export const URL_API_PROFILE = '/user/profile'

export const URL_API_CHANGE_PASSWORD = '/user/change-password'
export const URL_API_CHANGE_PROFILE = '/user/change-profile'

export const URL_API_GET_ALL_GROUP = '/group/get-all-group'
export const URL_API_ADD_GROUP = '/group'
export const URL_API_GET_GROUP_ID = '/group'
export const URL_API_UPDATE_GROUP = '/group'
export const URL_API_DELETE_GROUP = '/group/delete-group'
export const URL_API_SEARCH_GROUP = '/group/search-groups'

export const URL_API_GET_ALL_USER = '/user/get-all-user'
export const URL_API_ADD_USER = '/user'
export const URL_API_GET_USER_ID = '/user'
export const URL_API_UPDATE_USER = '/user'
export const URL_API_DELETE_USER = '/user/delete-user'

export const URL_API_GET_PERMISSION = '/permission/permissions'

export const URL_API_ADD_EVENT = '/event'
export const URL_API_GET_ALL_EVENT = '/event/get-all-event'
export const URL_API_GET_EVENT_BY_RANGE_DATE = '/event/get-event-by-range-date'
export const URL_API_GET_EVENT_HISTORY = '/event/event-history'
export const URL_API_UPDATE_EVENT = '/event'
export const URL_API_DELETE_EVENT = '/event/delete-event'
export const URL_API_COMPLETE_EVENT = '/event/complete-event'
export const URL_API_CANCEL_EVENT = '/event/cancel-event'
export const URL_API_REOPEN_EVENT = '/event/reopen-event'
export const URL_API_SEARCH_EVENT = '/event/search-event'
export const URL_API_USER_BY_EVENT = '/event/user-by-event'
export const URL_API_APPROVE_USER_TO_EVENT = '/event/approve-user-request'
export const URL_API_REMOVE_USER_FROM_EVENT = '/event/remove-user-from-event'
export const URL_API_ADD_USER_TO_EVENT = '/event/add-user-to-event'
export const URL_API_CANCEL_USER_REQUEST = '/event/cancel-user-request'
export const URL_API_DELETE_USER_EVENT = '/event/delete-user-event'
export const URL_API_REQUEST_JOIN_EVENT = '/user/request-join-event'
export const URL_API_GET_EVENT_BY_ID = '/event'

export const URL_API_MODIFY_VOTE = '/vote/modify-vote'

export const URL_API_FEEDBACK_BY_EVENT = '/feedback'
export const URL_API_ADD_FEEDBACK = '/feedback'

export const URL_API_REPORT_USER = '/report/reportUser'
export const URL_API_REPORT_EVENT = '/report/reportEvent'
export const URL_API_REPORT_USER_EVENT = '/report/reportEventByUser'
export const URL_API_REPORT_USER_EVENT_DETAIL = '/report/detail-user-event'

export const URL_API_NOTIFICATION = 'user/notification'
export const URL_API_NOTIFICATION_MAKE_READ_ALL = 'user/make-read-all'
export const URL_API_NOTIFICATION_MAKE_READ = 'user/make-read'