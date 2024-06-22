// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// https://developer.chrome.com/docs/extensions/reference/api/commands?hl=zh-cn
chrome.commands.onCommand.addListener((cmd) => {
  console.log(cmd)
  switch (cmd) {
    case "close_other_tabs":
      chrome.tabs.query({
        'active': false,
        'pinned': false
      }, tabs => chrome.tabs.remove(tabs.map(tab => tab.id)))
      break
    case "copy_this_tab":
      chrome.tabs.query({
        'active': true,
        'currentWindow': true
      },
      tabs => chrome.tabs.duplicate(tabs[0].id))
      break
    case "lock_this_tab":
      chrome.tabs.query({
          'active': true,
          'currentWindow': true
        },
        tabs => chrome.tabs.update(tabs[0].id, {
          pinned: !tabs[0].pinned
        }))
      break
  }
})