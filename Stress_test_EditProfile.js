import http from 'k6/http';
import { check } from "k6";
import { sleep } from "k6";

export const option = {

    stages: [
        { duration: '5s', target: 100 },
        { duration: '30s', target: 100 },
        { duration: '5s', target: 200 },
        { duration: '30s', target: 200 },
        { duration: '5s', target: 300 },
        { duration: '30s', target: 300 },
        { duration: '5s', target: 400 },
        { duration: '30s', target: 400 },
        { duration: '5s', target: 0 }
    ],
    thresholds: {
        http_req_failed: ["rate<0.01"],
        http_req_duration: ["p(95)<500"]
    }



}
let formData = {
    name: 'Muhammad Tio Supratama',
    whatsapp: '081212224211',
    birth_date: '1998-10-10'
};
let headers = { 'Content-Type': 'multipart/form-data' };


export default function () {
    const response = http.post(
        'https://demo-app.site/api/updateprofile',
        formData,
        headers

    )

    check(response, {
        "response code was 200": (res) => res.status == 200,

    })

    sleep(1)
}