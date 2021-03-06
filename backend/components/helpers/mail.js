// MIT License

// Copyright 2019-present, Digital Government Development Agency (Public Organization) 

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
"use strict";
const {
    logger
} = require('../../commons/logger');
const appConf = require('../../config/production.conf');
const mail = require('nodemailer');

function getTransport() {
    let setting = {
        host: appConf.SMTP_HOST,
        port: appConf.SMTP_PORT,
        secure: appConf.SMTP_SECURE,
        auth: appConf.SMTP_CREDENTIAL,
    };

    logger.debug("mail setting : " + JSON.stringify(setting));
    return mail.createTransport(setting);
}

/**
 * 
 * @param {object} data {"from: 'from_userr at dot com', // sender
    to: 'to.user at dot com', // list of receivers
    subject: 'reset password', // Mail subject
    html: '...' // HTML body"}
 * @param {object} trans transport
 */
function sendMail(data, trans) {
    let transport = trans || getTransport();
    return transport.sendMail(data);
}

module.exports = {
    sendMail
}