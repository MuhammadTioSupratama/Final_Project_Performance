import http from 'k6/http';
import { check } from "k6";
import { sleep } from "k6";

export const option = {

    stages: [
        { duration: '5s', target: 10 },
        { duration: '20s', target: 300 },
        { duration: '15s', target: 20 },
        { duration: '10s', target: 10 },
        { duration: '5s', target: 5 }
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