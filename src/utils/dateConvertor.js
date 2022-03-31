var moment = require('moment');
export const convertDate = (date) => {
    return moment(new Date(date)).format("DD MMM YYYY");
}