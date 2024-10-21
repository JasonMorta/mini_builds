import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import CSS from "./sort.module.css";
import { ListGroup } from "react-bootstrap";
const agents  = [
  {
    "available": false,
    "occasional": false,
    "id": 69075219037,
    "ticket_scope": 1,
    "created_at": "2024-09-11T10:35:19Z",
    "updated_at": "2024-09-11T10:51:40Z",
    "last_active_at": "2024-09-11T10:51:29Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "aberna.devi@freshworks.com",
      "job_title": null,
      "language": "en",
      "last_login_at": null,
      "mobile": null,
      "name": "Aberna Devi",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2024-09-11T10:35:19Z",
      "updated_at": "2024-09-11T10:51:00Z"
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><p><br></p>\n</div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417793,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69039429479,
    "ticket_scope": 1,
    "created_at": "2022-10-26T06:04:20Z",
    "updated_at": "2024-10-21T05:53:41Z",
    "last_active_at": "2024-10-21T05:53:41Z",
    "available_since": "2024-04-23T06:08:42Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "amberf@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-20T07:02:38Z",
      "mobile": null,
      "name": "Amber Fortuin",
      "phone": null,
      "time_zone": "Amsterdam",
      "created_at": "2022-10-26T06:04:20Z",
      "updated_at": "2024-06-06T10:35:09Z",
      "avatar": {
        "id": 69108189345,
        "name": "Screenshot 2024-03-15 134445.png",
        "content_type": "image/png",
        "size": 17921,
        "created_at": "2024-03-15T11:45:08Z",
        "updated_at": "2024-03-15T11:45:50Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69108189345/original/Screenshot%202024-03-15%20134445.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=e52eeebef3981a34cf0d55967cbe476bad4662fcb48f96e7ee4d825e8107febc",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69108189345/thumb/Screenshot%202024-03-15%20134445.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=04c03e60983d9f74d3e99166b81b9de5bcd6a4cf9574014d807e4f66a2a9c493"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><div dir=\"ltr\"><div dir=\"ltr\"></div></div><div></div></div><div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMjE5MTI4ODEsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.zSS2bfGazJ9otAeRcie1Blhp74Jb6l5Y3vCPFV9YLqw\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69121912881\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": true,
    "agent_level_id": 69000417792,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69039324220,
    "ticket_scope": 1,
    "created_at": "2022-10-26T06:21:51Z",
    "updated_at": "2024-10-21T05:32:58Z",
    "last_active_at": "2024-10-21T05:32:58Z",
    "available_since": "2024-10-18T14:53:38Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "azaliah@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-20T11:03:01Z",
      "mobile": null,
      "name": "azaliah kroutz",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2022-10-24T07:24:24Z",
      "updated_at": "2024-08-12T07:57:02Z",
      "avatar": {
        "id": 69108189229,
        "name": "Screenshot 2024-03-15 125731.png",
        "content_type": "image/png",
        "size": 20382,
        "created_at": "2024-03-15T11:43:39Z",
        "updated_at": "2024-03-15T11:43:46Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69108189229/original/Screenshot%202024-03-15%20125731.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=779ec452be719d73504f7d631f0b5307e7431a9ecaca4be252fc1d516d023907",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69108189229/thumb/Screenshot%202024-03-15%20125731.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=e9ffd88c9e63d2a03b9fd5c4296b8d812918d26361f1ac9f41762d71703c625b"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"></div><div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzIzMTUsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.soSW_eMXjntRU3kaIgl2s3buU3XtMXCSe_kPMhft_Nw\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107272315\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": true,
    "agent_level_id": 69000417791,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69027313800,
    "ticket_scope": 1,
    "created_at": "2022-03-30T07:44:32Z",
    "updated_at": "2024-07-01T05:52:13Z",
    "last_active_at": "2024-06-09T10:04:12Z",
    "available_since": "2023-07-03T14:57:48Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "bianca@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-06-04T06:52:16Z",
      "mobile": null,
      "name": "Bianca Mars",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2022-03-30T07:44:32Z",
      "updated_at": "2024-07-01T05:52:12Z",
      "avatar": {
        "id": 69043786741,
        "name": "xHGojXLk7UtAJqTmKeP-VjY13djQlbow6w.png",
        "content_type": "image/png",
        "size": 234912,
        "created_at": "2022-08-16T14:47:29Z",
        "updated_at": "2022-08-16T14:47:29Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69043786741/original/xHGojXLk7UtAJqTmKeP-VjY13djQlbow6w.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=c2f6d205e9aac09f1055e5f4294e64851899c052b4a29ef151c7b715efa2cf3f",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69043786741/thumb/xHGojXLk7UtAJqTmKeP-VjY13djQlbow6w.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b7342220f1fe01205869e32ee58a018c6800d3c0d1f5c3bb48c5a4ca4bb64790"
      }
    },
    "deactivated": true,
    "signature": "<div dir=\"ltr\"><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzIzNzEsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.99beO2AyCXj0OSoLXGCWuUomrxKgUReRX76k6cvokT4\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107272371\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"letter-spacing: normal; orphans: 2; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; color: rgb(68, 68, 68); font-family: sans-serif; font-size: 8pt;\" width=\"520\"><tbody><tr><td></td><td><table><tbody><tr><td></td></tr></tbody></table></td></tr></tbody></table></div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417792,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69060869936,
    "ticket_scope": 1,
    "created_at": "2023-09-26T18:03:12Z",
    "updated_at": "2024-07-22T06:09:29Z",
    "last_active_at": "2024-07-22T06:09:29Z",
    "available_since": "2023-10-10T18:06:53Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "blaine@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-07-20T07:03:08Z",
      "mobile": null,
      "name": "Blaine Halford",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2023-09-26T18:03:11Z",
      "updated_at": "2024-07-01T06:10:40Z"
    },
    "deactivated": false,
    "signature": "<div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzYyMzcsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.ObDKFjO2R2rMNgrk3QD8rqGwCfzf6oLYRGeK3DXJcgQ\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107276237\">&nbsp;</div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417789,
    "focus_mode": true
  },
  {
    "available": true,
    "occasional": false,
    "id": 69029420906,
    "ticket_scope": 1,
    "created_at": "2022-05-03T14:21:31Z",
    "updated_at": "2024-10-21T06:23:18Z",
    "last_active_at": "2024-10-21T06:23:18Z",
    "available_since": "2024-10-21T06:16:53Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "boanerges@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-21T06:16:25Z",
      "mobile": null,
      "name": "boanerges Banze",
      "phone": null,
      "time_zone": "Eastern Time (US & Canada)",
      "created_at": "2022-05-03T14:21:30Z",
      "updated_at": "2024-10-03T06:27:48Z",
      "avatar": {
        "id": 69043971620,
        "name": "d8823199-fc73-4a63-aebf-2831ec885d8f.jpg",
        "content_type": "image/jpeg",
        "size": 19495,
        "created_at": "2022-08-17T16:09:28Z",
        "updated_at": "2022-08-17T16:09:34Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69043971620/original/d8823199-fc73-4a63-aebf-2831ec885d8f.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=052a59bafc7c28cb0f239b75dc0a2992b9ca98822472d90ba501a3aa39c50b23",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69043971620/thumb/d8823199-fc73-4a63-aebf-2831ec885d8f.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=2b1a04f34e8ec72a0a49e3b9f7b5562f99a5cfac40da6898877227750fafa146"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><div dir=\"ltr\"><p><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzI0MjcsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.wg8VY4z4ExIHFzXSB7YD2P4vNpFWB3pPadIfo42XTXU\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107272427\"></p><p><br></p><p><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkwNzI2NzkzNDQsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.lAOgLSu224E9eFCVIezUx06g7Yc6Ch3nl3KxLAEk5w8\" data-id=\"69072679344\" style=\"width: auto;\" class=\"fr-fic fr-dii\"></p></div><div></div></div>",
    "freshcaller_agent": true,
    "freshchat_agent": true,
    "agent_level_id": 69000417793,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69029389677,
    "ticket_scope": 1,
    "created_at": "2022-10-26T07:33:41Z",
    "updated_at": "2024-07-15T07:55:24Z",
    "last_active_at": "2024-07-13T16:35:29Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "britney@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-07-12T07:01:36Z",
      "mobile": null,
      "name": "Britney Mentor",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2022-05-03T08:04:52Z",
      "updated_at": "2024-07-15T07:55:24Z",
      "avatar": {
        "id": 69043962276,
        "name": "QNh32v4b2jSlXtn2tluBxr3zaPVFSnhlkw.png",
        "content_type": "image/png",
        "size": 260714,
        "created_at": "2022-08-17T15:25:16Z",
        "updated_at": "2022-08-17T15:25:16Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69043962276/original/QNh32v4b2jSlXtn2tluBxr3zaPVFSnhlkw.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=ff828c53e4572b9add451ea3e066649abe98e7556119a6b386a61ccb006ddb9f",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69043962276/thumb/QNh32v4b2jSlXtn2tluBxr3zaPVFSnhlkw.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5039766c878a9d0a4a4dc7322a9280cf0f96d987acf4d360ab13faec773eb339"
      }
    },
    "deactivated": true,
    "signature": null,
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417789,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69070180641,
    "ticket_scope": 1,
    "created_at": "2024-04-30T06:39:47Z",
    "updated_at": "2024-10-21T05:03:34Z",
    "last_active_at": "2024-10-21T05:03:34Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "camerin@vaultmarkets.trade",
      "job_title": "FICA Agent ",
      "language": "en",
      "last_login_at": "2024-10-12T12:25:37Z",
      "mobile": null,
      "name": "Camerin",
      "phone": "Kolby",
      "time_zone": "Pretoria",
      "created_at": "2024-04-30T06:39:46Z",
      "updated_at": "2024-04-30T09:40:45Z",
      "avatar": {
        "id": 69128568305,
        "name": "7z0Jcl49Z3-ZfcXJ4esdL64VLZrlcBbpUQ.png",
        "content_type": "image/png",
        "size": 15557,
        "created_at": "2024-09-17T21:51:20Z",
        "updated_at": "2024-09-17T21:51:20Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69128568305/original/7z0Jcl49Z3-ZfcXJ4esdL64VLZrlcBbpUQ.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=26da4088b81b7e3f51531f681333ca7361f2e457a8b3205098ba77f5957da0d5",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69128568305/thumb/7z0Jcl49Z3-ZfcXJ4esdL64VLZrlcBbpUQ.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=a68d9f5d3540bf383ee065070be8c28141eaa800c1f69523368c01b1ed4c67c8"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMTI5NTQxOTEsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.-EfbNG-KIlu3hzWIHaWVCZfHA7D7vHafbyaFOwZyStY\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69112954191\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417788,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69035885053,
    "ticket_scope": 1,
    "created_at": "2022-08-18T05:40:28Z",
    "updated_at": "2024-10-21T06:05:11Z",
    "last_active_at": "2024-10-21T04:48:05Z",
    "available_since": "2024-10-21T06:05:11Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "candice@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-17T20:25:34Z",
      "mobile": null,
      "name": "Candice Japtha",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2022-08-18T05:40:28Z",
      "updated_at": "2022-08-18T05:42:12Z",
      "avatar": {
        "id": 69044075781,
        "name": "myk4N_DsUuuvbqHTm05ptwWLdy10xi-9Xg.jpg",
        "content_type": "image/jpeg",
        "size": 21928,
        "created_at": "2022-08-18T06:39:51Z",
        "updated_at": "2022-08-18T06:39:51Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69044075781/original/myk4N_DsUuuvbqHTm05ptwWLdy10xi-9Xg.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=bc15675ba661a4474c9cb0fc494a9eec1474f556108b3ff1cae72fa3949780b6",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69044075781/thumb/myk4N_DsUuuvbqHTm05ptwWLdy10xi-9Xg.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=f541711dc3a27be445cbf8b2207501049052fe256bf1d512ed9da575c246eef8"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><p><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzI1MzEsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.vcY_XCZvb2Do7GEmXChBw4sFEebdpxv74tZrcaHt-g4\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107272531\" height=\"255px\" data-height=\"255\"></p></div>",
    "freshcaller_agent": true,
    "freshchat_agent": true,
    "agent_level_id": 69000417791,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69050907497,
    "ticket_scope": 1,
    "created_at": "2023-05-23T11:32:32Z",
    "updated_at": "2024-09-27T14:49:27Z",
    "last_active_at": "2024-09-27T11:57:14Z",
    "available_since": "2024-09-27T14:49:27Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "carron@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-09-15T10:01:29Z",
      "mobile": null,
      "name": "Carron Smith",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2023-05-23T11:32:32Z",
      "updated_at": "2024-08-09T11:03:11Z",
      "avatar": {
        "id": 69100391886,
        "name": "Screenshot 2024-01-04 151003.png",
        "content_type": "image/png",
        "size": 69380,
        "created_at": "2024-01-04T13:10:23Z",
        "updated_at": "2024-01-04T13:10:29Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69100391886/original/Screenshot%202024-01-04%20151003.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=1a09b64eccf3612ee1ffd945db8a57cdd4586d9f827f06ea29db404144b9b998",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69100391886/thumb/Screenshot%202024-01-04%20151003.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=a627438f180c81c8ce1bbc008778782ea1810136f7d0c716337e1b75565e0c9a"
      }
    },
    "deactivated": false,
    "signature": "<div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzMyNjEsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.lPVIUCrtg4TlOj83ISkCmpyFFn454ZQJglm-ZjYmFuQ\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107273261\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": true,
    "agent_level_id": 69000417791,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69059900245,
    "ticket_scope": 1,
    "created_at": "2023-09-05T21:19:24Z",
    "updated_at": "2024-09-06T12:51:30Z",
    "last_active_at": "2024-09-06T10:05:59Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "cassidy@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-09-05T07:51:49Z",
      "mobile": null,
      "name": "Cassidy Dick",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2023-09-05T21:19:24Z",
      "updated_at": "2024-09-06T12:51:30Z"
    },
    "deactivated": true,
    "signature": "<div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzYzNDksImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.cc093HDXmokqa7XUJaci4J-bmTBCPxm8mI5l0gOivQs\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107276349\">&nbsp;</div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417789,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69048242470,
    "ticket_scope": 1,
    "created_at": "2023-04-05T08:13:59Z",
    "updated_at": "2024-10-16T07:02:50Z",
    "last_active_at": "2024-10-16T07:02:50Z",
    "available_since": "2024-07-26T14:58:12Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "chatwin@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-03T05:26:39Z",
      "mobile": null,
      "name": "Chatwin Van Rooyen",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2023-04-05T08:13:58Z",
      "updated_at": "2024-08-12T07:58:58Z",
      "avatar": {
        "id": 69073082636,
        "name": "EVl5oqtKsPFBJdZ6851qKofv8QdUWDWI8w.jpg",
        "content_type": "image/jpeg",
        "size": 52003,
        "created_at": "2023-04-20T10:10:52Z",
        "updated_at": "2023-04-20T10:10:52Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69073082636/original/EVl5oqtKsPFBJdZ6851qKofv8QdUWDWI8w.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=146118451f9aea2799fadd7c4082e366f711b55b99cbd8d4ac9a021862b92859",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69073082636/thumb/EVl5oqtKsPFBJdZ6851qKofv8QdUWDWI8w.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=c45b8b501dcc8b060da151ee69012d7a25d2424ad8ae51f2fbd6ef89a8785afe"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><p><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzMzMjYsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.U6gjqiJvhjibbhO2g2veL2XPB0en7iWnyud4C2pPrpM\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107273326\"></p></div>",
    "freshcaller_agent": false,
    "freshchat_agent": true,
    "agent_level_id": 69000417791,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69013028545,
    "ticket_scope": 1,
    "created_at": "2024-02-02T09:03:38Z",
    "updated_at": "2024-10-21T07:30:25Z",
    "last_active_at": "2024-10-21T07:30:25Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "chris@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-09-22T19:35:15Z",
      "mobile": null,
      "name": "Chris Henn",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2021-09-21T06:56:56Z",
      "updated_at": "2024-02-02T09:19:59Z"
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzMzNjMsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.Y02onKrMjTgbwo4mxKxnmRoQsJ0Ua3iV5f2SCtCzy9c\" style=\"width: auto; float: left; margin: 0px 10px 10px 0px;\" class=\"fr-fil fr-dib\" data-id=\"69107273363\" alt=\"\"></div>",
    "freshcaller_agent": true,
    "freshchat_agent": true,
    "agent_level_id": 69000417793,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69072959625,
    "ticket_scope": 1,
    "created_at": "2024-07-15T09:50:08Z",
    "updated_at": "2024-10-20T16:58:38Z",
    "last_active_at": "2024-10-20T16:58:38Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "dylanpetersen@vaultmarkets.trade",
      "job_title": "FICA Agent (Finance) ",
      "language": "en",
      "last_login_at": "2024-10-18T18:17:39Z",
      "mobile": null,
      "name": "Dylan Petersen",
      "phone": "Petersen",
      "time_zone": "Pretoria",
      "created_at": "2024-07-15T09:50:08Z",
      "updated_at": "2024-07-29T09:32:29Z"
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><p><br></p>\n</div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417788,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69040429186,
    "ticket_scope": 1,
    "created_at": "2022-11-14T11:43:21Z",
    "updated_at": "2024-10-19T19:32:34Z",
    "last_active_at": "2024-10-19T19:32:34Z",
    "available_since": "2024-10-19T15:02:45Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "evelyn@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-18T14:33:36Z",
      "mobile": null,
      "name": "Evelyn Mbata",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2022-11-14T11:43:21Z",
      "updated_at": "2022-11-14T11:43:53Z",
      "avatar": {
        "id": 69056102128,
        "name": "bq25vY4ybi1sCbyjn1f_KFHbzpT_e9dzAA.png",
        "content_type": "image/png",
        "size": 222894,
        "created_at": "2022-11-24T12:05:06Z",
        "updated_at": "2022-11-24T12:05:06Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69056102128/original/bq25vY4ybi1sCbyjn1f_KFHbzpT_e9dzAA.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=d29b6ebc46d20394f114f8f68a5a1ff9a1c9cf35350e48e8d9ad948e78a3eb24",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69056102128/thumb/bq25vY4ybi1sCbyjn1f_KFHbzpT_e9dzAA.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b242f956c6b597ed787d285f7e03760125c466e619cdefdce4779ac325dad874"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzM1MzEsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.11bYCGxp5UdZL7C7IU6oiCRojnJpmib-2G73U088TLk\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107273531\"><div dir=\"ltr\"><p></p></div></div>",
    "freshcaller_agent": false,
    "freshchat_agent": true,
    "agent_level_id": 69000417791,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69039324267,
    "ticket_scope": 1,
    "created_at": "2024-09-10T06:51:22Z",
    "updated_at": "2024-10-21T06:28:16Z",
    "last_active_at": "2024-10-21T06:28:16Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "dean@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-18T21:10:51Z",
      "mobile": null,
      "name": "FICA Leaders",
      "phone": null,
      "time_zone": "Amsterdam",
      "created_at": "2022-10-24T07:27:28Z",
      "updated_at": "2024-09-12T07:40:56Z"
    },
    "deactivated": false,
    "signature": null,
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417793,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": true,
    "id": 69075122194,
    "ticket_scope": 1,
    "created_at": "2024-09-08T20:07:28Z",
    "updated_at": "2024-09-09T08:43:35Z",
    "last_active_at": "2024-09-08T20:08:19Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "xishanxubayed+69000350059@gmail.com",
      "job_title": null,
      "language": "en",
      "last_login_at": null,
      "mobile": null,
      "name": "fresh desk",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2024-09-08T20:07:28Z",
      "updated_at": "2024-09-09T08:43:35Z"
    },
    "deactivated": true,
    "signature": "<div dir=\"ltr\"><p><br></p>\n</div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": null,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": true,
    "id": 69074050621,
    "ticket_scope": 2,
    "created_at": "2024-08-11T03:51:52Z",
    "updated_at": "2024-09-09T08:43:35Z",
    "last_active_at": "2024-08-11T03:52:20Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "xishanxubayed+newaccount1627234890025@gmail.com",
      "job_title": null,
      "language": "en",
      "last_login_at": null,
      "mobile": null,
      "name": "fresh desk",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2024-08-11T03:51:52Z",
      "updated_at": "2024-09-09T08:43:35Z"
    },
    "deactivated": true,
    "signature": "<div dir=\"ltr\"><p><br></p>\n</div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": null,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69009746550,
    "ticket_scope": 1,
    "created_at": "2021-07-25T17:41:30Z",
    "updated_at": "2024-10-21T05:32:13Z",
    "last_active_at": "2024-10-21T05:32:13Z",
    "available_since": "2023-10-16T06:08:46Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "jermaine@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-18T08:26:23Z",
      "mobile": null,
      "name": "Kashief Trumpeter",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2021-07-25T17:41:30Z",
      "updated_at": "2024-09-09T08:52:47Z",
      "avatar": {
        "id": 69047999520,
        "name": "nv9GCx3A10Z7YI0BYgmw7burP_9FREGP3g.png",
        "content_type": "image/png",
        "size": 99587,
        "created_at": "2022-09-20T07:40:25Z",
        "updated_at": "2024-03-22T06:59:20Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69047999520/original/nv9GCx3A10Z7YI0BYgmw7burP_9FREGP3g.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=077339e5040e525642a2e5866e14bd8326a65ff9596046521ce0b52a3a3410aa",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69047999520/thumb/nv9GCx3A10Z7YI0BYgmw7burP_9FREGP3g.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=ea31394cf489712291d406f989df1c9e34f5c1c7210c6b1aae9949399471f5c7"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><p><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzM2NDUsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.e_RKWWNqLuEoBaGaJwqcQ9T1ZDR0k56X6H7PSZk_GyA\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107273645\"></p><p><br></p><p><br></p><p></p></div>",
    "freshcaller_agent": true,
    "freshchat_agent": true,
    "agent_level_id": 69000417792,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69044545458,
    "ticket_scope": 1,
    "created_at": "2024-07-15T10:04:54Z",
    "updated_at": "2024-10-21T06:14:52Z",
    "last_active_at": "2024-10-21T06:14:52Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "kauthar@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-18T06:54:54Z",
      "mobile": null,
      "name": "Kauthar Nazier",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2023-01-23T14:44:08Z",
      "updated_at": "2024-07-15T10:09:36Z"
    },
    "deactivated": false,
    "signature": null,
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417788,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69039429491,
    "ticket_scope": 1,
    "created_at": "2023-09-27T07:10:22Z",
    "updated_at": "2024-07-15T10:13:31Z",
    "last_active_at": "2024-07-15T09:57:23Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "kauthara@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-04-25T13:52:34Z",
      "mobile": null,
      "name": "KautharA Ahmed",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2022-10-26T06:05:18Z",
      "updated_at": "2024-07-15T10:13:31Z"
    },
    "deactivated": true,
    "signature": null,
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417788,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69030578330,
    "ticket_scope": 1,
    "created_at": "2023-10-02T11:32:53Z",
    "updated_at": "2024-09-20T13:04:05Z",
    "last_active_at": "2024-09-20T13:04:05Z",
    "available_since": "2023-12-02T13:35:14Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "liam@vaultmarkets.trade",
      "job_title": "Support Agent",
      "language": "en",
      "last_login_at": "2024-09-18T05:58:58Z",
      "mobile": null,
      "name": "Liam Willenberg",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2022-05-19T10:20:44Z",
      "updated_at": "2023-10-02T13:25:08Z"
    },
    "deactivated": false,
    "signature": "<div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzM2OTgsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.DegeOKlSTM3pUoAssx417vYJ91thejhaP5aTGKNG_RY\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107273698\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": true,
    "agent_level_id": 69000417791,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69029388534,
    "ticket_scope": 1,
    "created_at": "2022-05-03T07:07:57Z",
    "updated_at": "2024-10-17T18:49:43Z",
    "last_active_at": "2024-10-17T18:49:43Z",
    "available_since": "2023-06-07T10:42:27Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "mikhail@vaultmarkets.trade",
      "job_title": "Support Agent",
      "language": "en",
      "last_login_at": "2024-10-14T07:07:44Z",
      "mobile": null,
      "name": "Mikhail Kroutz",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2022-05-03T07:07:56Z",
      "updated_at": "2022-08-24T06:04:03Z",
      "avatar": {
        "id": 69043753837,
        "name": "LfZu26SpROgNicZZqPW0Zt6XJKxHm0asew.jpg",
        "content_type": "image/jpeg",
        "size": 21917,
        "created_at": "2022-08-16T11:41:28Z",
        "updated_at": "2022-08-16T11:41:28Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69043753837/original/LfZu26SpROgNicZZqPW0Zt6XJKxHm0asew.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=4bae166d80445b7e9b2f7c17506fc06300aa370b23c8d1a51510fe38206d653f",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69043753837/thumb/LfZu26SpROgNicZZqPW0Zt6XJKxHm0asew.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=9d719cd5713b454a8b56786ca7844db27fa4dc7bbb021cf82e9ca77e12ce29e5"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><img class=\"fr-fic fr-dii\"><br></div>",
    "freshcaller_agent": true,
    "freshchat_agent": true,
    "agent_level_id": 69000417792,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69057443216,
    "ticket_scope": 1,
    "created_at": "2023-08-24T13:34:53Z",
    "updated_at": "2024-10-18T21:34:12Z",
    "last_active_at": "2024-10-18T19:23:03Z",
    "available_since": "2024-10-18T21:34:12Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "mlamli@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-18T15:16:56Z",
      "mobile": null,
      "name": "Mlamli Mtatase",
      "phone": null,
      "time_zone": "Amsterdam",
      "created_at": "2023-08-24T13:34:52Z",
      "updated_at": "2024-04-17T15:59:54Z",
      "avatar": {
        "id": 69108213265,
        "name": "Screenshot 2024-03-15 163336.png",
        "content_type": "image/png",
        "size": 7526,
        "created_at": "2024-03-15T14:34:46Z",
        "updated_at": "2024-03-15T14:34:55Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69108213265/original/Screenshot%202024-03-15%20163336.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=837a8ceecfa2943a3524e086e71ca9c86012dee545dcf59eb5944fdd5bfba142",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69108213265/thumb/Screenshot%202024-03-15%20163336.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=f84f076ac2345a36261f192f99498da2c574f7b53008e34c7b53d44610ba6f55"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><p><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzM4NjgsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.HJ0HRTOIFvVsXrXt5vZRRmEPYR-WypZXCiwi-KmtB5E\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107273868\"></p></div>",
    "freshcaller_agent": false,
    "freshchat_agent": true,
    "agent_level_id": 69000417791,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69071424396,
    "ticket_scope": 1,
    "created_at": "2024-06-03T07:13:05Z",
    "updated_at": "2024-10-21T09:17:41Z",
    "last_active_at": "2024-10-21T09:17:41Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "naseefah@vaultmarkets.trade",
      "job_title": "FICA Agent ",
      "language": "en",
      "last_login_at": "2024-10-17T06:20:06Z",
      "mobile": "0845670131",
      "name": "Naseefah Murphy",
      "phone": null,
      "time_zone": "Amsterdam",
      "created_at": "2024-06-03T07:13:05Z",
      "updated_at": "2024-07-25T13:06:13Z"
    },
    "deactivated": false,
    "signature": "<div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMTY1NzYzODEsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.dJpQXleCAbeJf3kFfy5XLgO_tiLwrMq1ZP9pyrznynU\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69116576381\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417788,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69075050951,
    "ticket_scope": 1,
    "created_at": "2024-09-06T12:53:15Z",
    "updated_at": "2024-10-21T06:04:44Z",
    "last_active_at": "2024-10-21T06:04:44Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "nazneen@vaultmarkets.trade",
      "job_title": "FICA Agent",
      "language": "en",
      "last_login_at": "2024-10-18T08:33:13Z",
      "mobile": null,
      "name": "Nazneen Toyer",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2024-09-06T12:53:15Z",
      "updated_at": "2024-09-06T12:56:21Z"
    },
    "deactivated": false,
    "signature": "<div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMjcyNjgzNDUsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.2t7Zvac3oeUVpCWMIpPQS-30_jBh-Xuc4mXfoh8E6ew\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69127268345\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417788,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69014499108,
    "ticket_scope": 2,
    "created_at": "2023-12-26T06:46:09Z",
    "updated_at": "2024-10-21T07:25:29Z",
    "last_active_at": "2024-10-21T07:25:29Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "nikita@vaultmarkets.trade",
      "job_title": "FICA Agent ",
      "language": "en",
      "last_login_at": "2024-10-20T12:06:12Z",
      "mobile": null,
      "name": "Nikita Seita",
      "phone": null,
      "time_zone": "Athens",
      "created_at": "2021-10-11T06:15:32Z",
      "updated_at": "2024-07-31T08:48:35Z"
    },
    "deactivated": false,
    "signature": "<div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzY0MTQsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ._PIMrMCfa46JZ3aWgJ1IxUlQ3dcDaGMotyJfDeyI2Y4\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107276414\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417788,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69065422938,
    "ticket_scope": 1,
    "created_at": "2024-01-04T06:02:57Z",
    "updated_at": "2024-10-21T07:31:35Z",
    "last_active_at": "2024-10-21T07:31:35Z",
    "available_since": "2024-09-19T14:59:21Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "prosper@vaultmarkets.trade",
      "job_title": "Support Agent ",
      "language": "en",
      "last_login_at": "2024-10-21T06:10:18Z",
      "mobile": null,
      "name": "Prosper Daniels",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2024-01-04T06:02:57Z",
      "updated_at": "2024-01-04T06:04:29Z",
      "avatar": {
        "id": 69100364970,
        "name": "Screenshot 2024-01-04 085943.png",
        "content_type": "image/png",
        "size": 3558,
        "created_at": "2024-01-04T06:59:58Z",
        "updated_at": "2024-01-04T07:00:05Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69100364970/original/Screenshot%202024-01-04%20085943.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=a8889e5d4e9eb8e45ce56f7b97995fe527f4142ebeb40476154e34b2faefba12",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69100364970/thumb/Screenshot%202024-01-04%20085943.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=dba3f6ed96e3d94c0a930e6091f68c3364c2541d880ea9e1192b3f03dc42b7c0"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><p><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzQzODgsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.mwdJ9FN4qie2YPZbh_SwbJpEKCBqZqaFUed5ZsRaUQ8\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107274388\"></p></div><div><br></div>",
    "freshcaller_agent": false,
    "freshchat_agent": true,
    "agent_level_id": 69000417789,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69045136911,
    "ticket_scope": 1,
    "created_at": "2023-02-06T09:30:58Z",
    "updated_at": "2024-10-20T19:52:36Z",
    "last_active_at": "2024-10-20T19:09:45Z",
    "available_since": "2024-10-20T19:52:36Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "sidney@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-18T14:42:38Z",
      "mobile": null,
      "name": "Sidney Kolby",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2023-02-06T09:30:58Z",
      "updated_at": "2023-02-06T09:30:58Z",
      "avatar": {
        "id": 69105614173,
        "name": "us8SHwm7k4avjYqrnQACDbR5NWfju8kpgw.jpg",
        "content_type": "image/jpeg",
        "size": 16175,
        "created_at": "2024-02-21T15:47:05Z",
        "updated_at": "2024-02-21T15:47:05Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69105614173/original/us8SHwm7k4avjYqrnQACDbR5NWfju8kpgw.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=a64baa293552c5896f89024b55487a95830604aae292836eae44ac77be00842f",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69105614173/thumb/us8SHwm7k4avjYqrnQACDbR5NWfju8kpgw.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7b9dca825f38a5834c4c9ccc628e7a7b7da265f416e4e74390708e3223b6f3f9"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><div dir=\"ltr\"><p><br></p></div><div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzQ0NDYsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.oyxEDv5S968-cysQfPYYN99iN-rMIbhgSatzW7RqgH4\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107274446\"></div></div>",
    "freshcaller_agent": false,
    "freshchat_agent": true,
    "agent_level_id": 69000417790,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69068095435,
    "ticket_scope": 1,
    "created_at": "2024-03-11T13:53:19Z",
    "updated_at": "2024-10-21T06:27:17Z",
    "last_active_at": "2024-10-21T06:27:17Z",
    "available_since": "2024-04-09T12:49:05Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "simanye@vaultmarkets.trade",
      "job_title": "FICA Agent ",
      "language": "en",
      "last_login_at": "2024-10-21T06:17:49Z",
      "mobile": "0733271529",
      "name": "Simanye Sonti",
      "phone": null,
      "time_zone": "Athens",
      "created_at": "2024-03-11T13:53:19Z",
      "updated_at": "2024-05-04T10:08:01Z",
      "avatar": {
        "id": 69120932265,
        "name": "BKu7FOEhXAX4AS1PrqQBbknw4yiy4Zx0hg.jpeg",
        "content_type": "image/jpeg",
        "size": 7687,
        "created_at": "2024-07-12T09:45:56Z",
        "updated_at": "2024-07-12T09:45:56Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69120932265/original/BKu7FOEhXAX4AS1PrqQBbknw4yiy4Zx0hg.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=70b6e3409f9bcb9ada9be0500ca52740e1a6635f2cb6a636c5c05da6c959b0c1",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69120932265/thumb/BKu7FOEhXAX4AS1PrqQBbknw4yiy4Zx0hg.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7d8a83e688cebdfd682775e3e87aae88dffa6f06478473688918348bb65b42c4"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDc2MjMwMzAsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.vQ4PjeWKct1LPDkgN39QqCQIET8EXzbAI_-wMDNPHTI\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107623030\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417788,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69055065684,
    "ticket_scope": 1,
    "created_at": "2023-07-24T06:40:44Z",
    "updated_at": "2024-10-21T07:01:30Z",
    "last_active_at": "2024-10-21T07:01:30Z",
    "available_since": "2024-07-07T11:43:58Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "sisa@vaultmarkets.trade",
      "job_title": "Support Agent",
      "language": "en",
      "last_login_at": "2024-10-18T06:18:51Z",
      "mobile": null,
      "name": "Sisa mlityalwa",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2023-07-24T06:40:43Z",
      "updated_at": "2024-08-12T08:00:23Z"
    },
    "deactivated": false,
    "signature": "<div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMTgyNjM4MDgsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.1xTaMAeWfSr7jiNa5HRg4036A2lRQzuV3drI6BzZTX8\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69118263808\"></div><div dir=\"ltr\"><p></p></div><div><br></div>",
    "freshcaller_agent": false,
    "freshchat_agent": true,
    "agent_level_id": 69000417791,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69063137017,
    "ticket_scope": 2,
    "created_at": "2023-11-21T08:51:56Z",
    "updated_at": "2024-10-20T14:03:34Z",
    "last_active_at": "2024-10-20T14:03:34Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "tatumm@vaultmarkets.trade",
      "job_title": "FICA Agent",
      "language": "en",
      "last_login_at": "2024-10-18T15:01:40Z",
      "mobile": null,
      "name": "Tatum McMahon",
      "phone": "McMahon",
      "time_zone": "Athens",
      "created_at": "2023-11-21T08:51:55Z",
      "updated_at": "2024-04-04T16:14:12Z"
    },
    "deactivated": false,
    "signature": "<div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzY2NzAsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.6tYhQq7HoDoFPOLgPtS8RqVewZIJezHzNqSm36vecrg\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107276670\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417789,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69041302750,
    "ticket_scope": 1,
    "created_at": "2023-05-23T11:24:52Z",
    "updated_at": "2024-07-15T07:55:59Z",
    "last_active_at": "2024-07-15T06:05:18Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "tatum@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-07-12T19:08:36Z",
      "mobile": null,
      "name": "Tatum Petersen",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2022-11-30T06:13:31Z",
      "updated_at": "2024-07-15T07:55:59Z"
    },
    "deactivated": true,
    "signature": "<div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzY4ODUsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.O023LSjlITDuTJg7fuIVdgh1DiJC_MfTsiLOpQ348Mo\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107276885\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417790,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69071549841,
    "ticket_scope": 1,
    "created_at": "2024-06-06T09:53:50Z",
    "updated_at": "2024-10-21T00:54:43Z",
    "last_active_at": "2024-10-21T00:54:43Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "tauriq@vaultmarkets.trade",
      "job_title": "FICA Agent ",
      "language": "en",
      "last_login_at": "2024-10-18T15:26:50Z",
      "mobile": "0746401433",
      "name": "Tauriq Poole",
      "phone": null,
      "time_zone": "Amsterdam",
      "created_at": "2024-06-06T09:53:50Z",
      "updated_at": "2024-07-25T13:37:00Z"
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><p><br></p>\n</div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417788,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69053395479,
    "ticket_scope": 1,
    "created_at": "2023-06-22T09:11:18Z",
    "updated_at": "2024-10-21T05:38:38Z",
    "last_active_at": "2024-10-21T05:38:38Z",
    "available_since": null,
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "thabiso@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-06T10:12:42Z",
      "mobile": null,
      "name": "Thabiso Hlaleleni",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2023-06-22T09:11:17Z",
      "updated_at": "2023-06-22T09:15:41Z"
    },
    "deactivated": false,
    "signature": "<div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzY5OTQsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.S74ekUXJ_BhPojws6MnSySVJbo1tTbdZhKOo5VZpTh0\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107276994\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417791,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69039324123,
    "ticket_scope": 1,
    "created_at": "2022-10-26T08:40:16Z",
    "updated_at": "2024-09-06T12:53:34Z",
    "last_active_at": "2024-06-19T15:23:07Z",
    "available_since": "2023-04-18T11:39:52Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "thembinkosi@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-06-18T20:07:17Z",
      "mobile": null,
      "name": "Thembinkosi Sangovana",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2022-10-24T07:20:57Z",
      "updated_at": "2024-09-06T12:53:34Z"
    },
    "deactivated": true,
    "signature": "<div dir=\"ltr\"><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzcwNzksImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.KpwWZephk1T4RrvTwYuxWKjBQq03abDB3IHedia1MOc\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107277079\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417793,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69059900134,
    "ticket_scope": 2,
    "created_at": "2023-09-05T21:15:55Z",
    "updated_at": "2024-10-18T19:29:54Z",
    "last_active_at": "2024-10-18T19:29:54Z",
    "available_since": "2023-10-10T16:31:48Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "tinashe@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-17T15:09:16Z",
      "mobile": null,
      "name": "Tinashe Marota",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2023-09-05T21:15:55Z",
      "updated_at": "2024-04-10T15:46:44Z"
    },
    "deactivated": false,
    "signature": "<div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzcxODIsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.H2UIF9luPZyU-x95khr1OuW0bPGHO7p7Vv2aT46I2Ik\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107277182\">&nbsp;</div>",
    "freshcaller_agent": false,
    "freshchat_agent": false,
    "agent_level_id": 69000417789,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69045136924,
    "ticket_scope": 1,
    "created_at": "2023-02-06T09:31:31Z",
    "updated_at": "2024-10-20T15:03:10Z",
    "last_active_at": "2024-10-20T14:19:47Z",
    "available_since": "2024-10-20T15:03:10Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "tiyana@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-18T15:03:43Z",
      "mobile": null,
      "name": "Tiyana De leeuw",
      "phone": null,
      "time_zone": "Athens",
      "created_at": "2023-02-06T09:31:31Z",
      "updated_at": "2024-04-09T15:53:55Z",
      "avatar": {
        "id": 69108189685,
        "name": "HBXrrxX87UooPa6waw9jcqWzrKa3I4nPVQ.jpg",
        "content_type": "image/jpeg",
        "size": 16238,
        "created_at": "2024-03-15T11:49:37Z",
        "updated_at": "2024-03-18T15:05:58Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69108189685/original/HBXrrxX87UooPa6waw9jcqWzrKa3I4nPVQ.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=895b4954c87b12252154689f19bd9d6d2044a03f1bc34905faae7431dea5f2bf",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69108189685/thumb/HBXrrxX87UooPa6waw9jcqWzrKa3I4nPVQ.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=54326045e11f3365cb1cb5ddc30f7b597317e9effc9bfa22bce6a5050e458214"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><div dir=\"ltr\"><p><br></p></div><div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMDcyNzQ2MjUsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ._QsU90vzZHU6kbHbPI3L5g-_H2fcKyAsnca35tgFr3M\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69107274625\">&nbsp;</div></div>",
    "freshcaller_agent": false,
    "freshchat_agent": true,
    "agent_level_id": 69000417790,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69072447758,
    "ticket_scope": 1,
    "created_at": "2024-07-01T05:55:40Z",
    "updated_at": "2024-10-02T07:29:04Z",
    "last_active_at": "2024-10-02T07:29:04Z",
    "available_since": "2024-08-02T11:47:48Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "tyler@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-02T07:28:53Z",
      "mobile": null,
      "name": "Tyler Maart",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2024-07-01T05:55:39Z",
      "updated_at": "2024-08-19T11:39:11Z",
      "avatar": {
        "id": 69120502528,
        "name": "Screenshot 2024-07-09 090839.png",
        "content_type": "image/png",
        "size": 13555,
        "created_at": "2024-07-09T07:09:40Z",
        "updated_at": "2024-07-09T07:09:46Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69120502528/original/Screenshot%202024-07-09%20090839.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=fbaabe8ced07a57e28e92f442818779505150ef9a39028ef1eb76ab2bc5762cc",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69120502528/thumb/Screenshot%202024-07-09%20090839.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=3ca6b58f78f2e0f8ebb5d57e7b3492a893cd546648b696a5d5a86e7d925738e4"
      }
    },
    "deactivated": false,
    "signature": "<div><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMTk2MjcwMzMsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.eApoZoGfo2tQAEWJEPWJVDxVovkFPf2xNqHM1sVVT0g\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69119627033\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": true,
    "agent_level_id": 69000417788,
    "focus_mode": true
  },
  {
    "available": false,
    "occasional": false,
    "id": 69044289964,
    "ticket_scope": 1,
    "created_at": "2023-02-07T14:45:53Z",
    "updated_at": "2024-10-21T08:08:53Z",
    "last_active_at": "2024-10-21T08:08:53Z",
    "available_since": "2024-10-18T13:22:53Z",
    "type": "support_agent",
    "contact": {
      "active": true,
      "email": "zita@vaultmarkets.trade",
      "job_title": null,
      "language": "en",
      "last_login_at": "2024-10-18T07:07:39Z",
      "mobile": null,
      "name": "Zita Smith",
      "phone": null,
      "time_zone": "Pretoria",
      "created_at": "2023-01-19T14:13:15Z",
      "updated_at": "2024-08-12T07:55:55Z",
      "avatar": {
        "id": 69121710745,
        "name": "zs.png",
        "content_type": "image/png",
        "size": 19593,
        "created_at": "2024-07-19T08:27:46Z",
        "updated_at": "2024-07-19T08:27:52Z",
        "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69121710745/original/zs.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=27abc48d9d38835659cbf225062a48433ebae6ff781f94de7818cdd26de8f885",
        "thumb_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/69121710745/thumb/zs.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20241021%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241021T092559Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=f7acebdf193276c518ce35075c2de41ffcaf46554e629d558ce174af660e66ef"
      }
    },
    "deactivated": false,
    "signature": "<div dir=\"ltr\"><img src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjkxMTU4NjYxNDYsImRvbWFpbiI6Im5ld2FjY291bnQxNjI3MjM0ODkwMDI1LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoyMDAzNjU4fQ.-ykcyRyIOXVEppO2YOIVmwFEsqfbOmVx8yD4zocWmUQ\" style=\"width: auto;\" class=\"fr-fil fr-dib\" data-id=\"69115866146\"></div>",
    "freshcaller_agent": false,
    "freshchat_agent": true,
    "agent_level_id": 69000417791,
    "focus_mode": true
  }
]
export default function Sortable() {
  // if there is no data in local storage, use the default data
  const [allAgents, setAllAgents] = useState(JSON.parse(localStorage.getItem('allAgents')) || agents);
  //split allAgents into two groups
  const [dayShift, setDayShift] = useState(JSON.parse(localStorage.getItem('dayShift')) || []);
  const [nightShift, setNightShift] = useState(JSON.parse(localStorage.getItem('nightShift')) || []);


  const handleMouseUp = () => {
    console.log("mouse up");
    console.log('allAgents', allAgents);
    console.log('dayShift', dayShift);
    console.log('nightShift', nightShift);

  };

//store the agents in local storage\
useEffect(() => {
  localStorage.setItem('allAgents', JSON.stringify(allAgents));
    localStorage.setItem('dayShift', JSON.stringify(dayShift));
    localStorage.setItem('nightShift', JSON.stringify(nightShift));
}, [allAgents, dayShift, nightShift]);


  

  return (
    <>
      <div className={CSS.main_sortable}>
        <h1>Sortables</h1>
        <div className={CSS.day_shift}>
        <h3>Agents</h3>
          <ListGroup>
            {/* sortable options */}
            <ReactSortable
              className={CSS.sortable}
              list={allAgents} // set the list to the state
              setList={setAllAgents} // set the new state of the list
              animation={200} // animation speed when dragging an item
              delay={2} // delay for touch devices
              delayOnTouchStart={true}
              delayOnTouchEnd={true}
              swapThreshold={1}
              group={{
                // set the group. Can have multiple lists with same group
                name: "shared", // set both lists to same group
                put: true, // Set to false to disable drag from other lists
  
              }}
              ghostClass={CSS.ghost} // Class name for the drop placeholder
              chosenClass="chosen" // Class name for the chosen item
              onEnd={handleMouseUp} // onEnd event handler for when the item is dropped
              onChange={(order, sortable, evt) => {
                //console.log(order);
              }}
            >
              {/* Sortable list */}
              {allAgents.map((item) => (
                <ListGroup.Item
                  className={CSS.item}
                  variant={"warning"}
                  key={item.id}
                >
                  {item.contact.name}
                </ListGroup.Item>
              ))}
            </ReactSortable>
          </ListGroup>
        </div>


        <div className={CSS.day_shift}>
        <h3>Day shift | {dayShift.length}</h3>
          <ListGroup>
            {/* sortable options */}
            <ReactSortable
              className={CSS.sortable}
              list={dayShift} // set the list to the state
              setList={setDayShift} // set the new state of the list
              animation={200} // animation speed when dragging an item
              delay={2} // delay for touch devices
              delayOnTouchStart={true}
              delayOnTouchEnd={true}
              swapThreshold={1}
              group={{
                // set the group. Can have multiple lists with same group
                name: "shared", // set both lists to same group
                put: true, // Set to false to disable drag from other lists
  
              }}
              ghostClass={CSS.ghost} // Class name for the drop placeholder
              chosenClass="chosen" // Class name for the chosen item
              onEnd={handleMouseUp} // onEnd event handler for when the item is dropped
              onChange={(order, sortable, evt) => {
                //console.log(order);
              }}
            >
              {/* Sortable list */}
              {dayShift.map((item) => (
                <ListGroup.Item
                  className={CSS.item}
                  variant={"primary"}
                  key={item.id}
                >
                  {item.contact.name}
                </ListGroup.Item>
              ))}
            </ReactSortable>
          </ListGroup>
        </div>

        <div className={CSS.night_shift}>
          <h3>Night shift | {nightShift.length}</h3>
          <ListGroup>
            <ReactSortable
              className={CSS.sortable}
              list={nightShift} // set the list to the state
              setList={setNightShift} // set the new state of the list
              animation={200} // animation speed when dragging an item
              delay={2} // delay for touch devices
              delayOnTouchStart={true}
              swapThreshold={1}
              delayOnTouchEnd={true}
              group={{
                // set the group. Can have multiple lists with same group
                name: "shared", // set both lists to same group
                put: true, // Set to false to disable drag from other lists
              }}
              ghostClass={CSS.ghost} // Class name for the drop placeholder
              chosenClass="chosen" // Class name for the chosen item
              onEnd={handleMouseUp} // onEnd event handler for when the item is dropped
              onChange={(order, sortable, evt) => {
                //console.log(order);
              }}
            >
              {/* Sortable list */}
              {nightShift.map((item) => (
                <ListGroup.Item
                  variant={"success"}
                  className={CSS.item}
                  key={item.id}
                >
                  {item.contact.name}
                </ListGroup.Item>
              ))}
            </ReactSortable>
          </ListGroup>
        </div>

      </div>

    </>
  );
}
