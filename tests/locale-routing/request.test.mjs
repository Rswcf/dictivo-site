import test from "node:test";
import assert from "node:assert/strict";
import { isAutomatedClient, navigationKind, readCookie } from "../../lib/locale-routing/request.mjs";

const BROWSERS = [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0",
  "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.47(0x18002f2f) NetType/WIFI Language/zh_CN",
  "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36 NAVER(inapp; search; 2000; 12.3.1)",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Twitter for iPhone/10.50",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 DuckDuckGo/7 Safari/605.1.15",
];

const AUTOMATED = [
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/140.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Linux; Android 6.0.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Mobile Safari/537.36 (compatible; Google-InspectionTool/1.0)",
  "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)",
  "Mozilla/5.0 (compatible; Yeti/1.1; +https://naver.me/spd)",
  "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.1; +https://openai.com/gptbot)",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
  "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
  "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)",
  "Twitterbot/1.0",
  "WhatsApp/2.23.20.0",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/140.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse",
  "curl/8.7.1",
  "node",
  "",
];

test("browsers and in-app browsers are not automated", () => {
  for (const ua of BROWSERS) assert.equal(isAutomatedClient(ua), false, ua);
});

test("crawlers, link previews, headless and HTTP clients are automated", () => {
  for (const ua of AUTOMATED) assert.equal(isAutomatedClient(ua), true, ua);
  assert.equal(isAutomatedClient(undefined), true);
});

test("classifies navigations", () => {
  const origin = "https://dictivo.app";
  const kind = (headers) => navigationKind(new Headers(headers), origin);
  assert.equal(kind({ "sec-fetch-dest": "document", "sec-fetch-site": "none" }), "entry");
  assert.equal(kind({ "sec-fetch-dest": "document", "sec-fetch-site": "cross-site" }), "entry");
  assert.equal(kind({ "sec-fetch-dest": "document", "sec-fetch-site": "same-site" }), "entry");
  assert.equal(kind({ "sec-fetch-dest": "document", "sec-fetch-site": "same-origin" }), "internal");
  assert.equal(kind({ "sec-fetch-dest": "image", "sec-fetch-site": "cross-site" }), "subresource");
  assert.equal(kind({ "sec-fetch-dest": "document", "sec-purpose": "prefetch;prerender" }), "prefetch");
  assert.equal(kind({ purpose: "prefetch", accept: "text/html" }), "prefetch");
  assert.equal(kind({ accept: "text/html", referer: "https://dictivo.app/de/" }), "internal");
  assert.equal(kind({ accept: "text/html", referer: "https://www.google.com/" }), "entry");
  assert.equal(kind({ accept: "text/html,application/xhtml+xml" }), "entry");
  assert.equal(kind({ accept: "*/*" }), "subresource");
});

test("reads a cookie by exact name and tolerates bad values", () => {
  assert.equal(readCookie("a=1; dictivo_lang=fr; x_dictivo_lang=de", "dictivo_lang"), "fr");
  assert.equal(readCookie("x_dictivo_lang=de", "dictivo_lang"), null);
  assert.equal(readCookie("dictivo_lang=%E0%A4%A", "dictivo_lang"), null);
  assert.equal(readCookie(null, "dictivo_lang"), null);
});
