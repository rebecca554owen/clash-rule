  // 国内DNS服务器
const domesticNameservers = [
  "192.168.100.200"
];
  // 国外DNS服务器
const foreignNameservers = [
  "192.168.100.200"//,
  //  "https://1.1.1.1/dns-query", // Cloudflare(主)
  //  "https://1.0.0.1/dns-query", // Cloudflare(备)
  //  'https://8.8.8.8/dns-query', // Google(主)
  //  'https://8.8.4.4/dns-query' // Google(备)
];
  // DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": true,
  "use-system-hosts": true, // true or false
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
  // 本地主机/设备
  "+.lan",
  "+.local",
  // Windows网络出现小地球图标
  "+.msftconnecttest.com",
  "+.msftncsi.com",
  // QQ快速登录检测失败
  "localhost.ptlogin2.qq.com",
  "localhost.sec.qq.com",
  // 微信快速登录检测失败
  "localhost.work.weixin.qq.com"
  ],
  "default-nameserver": ["192.168.100.200"], //"tls://223.5.5.5:853","tls://1.12.12.12:853"
  "nameserver": [...domesticNameservers],
  "proxy-server-nameserver": [...domesticNameservers],
  "nameserver-policy": {
    "geosite:private,cn,geolocation-cn": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
  // ...domesticNameservers,...foreignNameservers
  }
};
  // 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "behavior": "domain",
  "format": "yaml",
  "interval": 86400
};
  // 规则集配置
const ruleProviders = {
  "apple": {
    ...ruleProviderCommon,
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./rulesets/loyalsoldier/apple.yaml"
  },
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./rulesets/loyalsoldier/applications.yaml"
  },
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./rulesets/loyalsoldier/cncidr.yaml"
  },
  "direct": {
    ...ruleProviderCommon,
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./rulesets/loyalsoldier/direct.yaml"
  },
  "gfw": {
    ...ruleProviderCommon,
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./rulesets/loyalsoldier/gfw.yaml"
  },
  "google": {
    ...ruleProviderCommon,
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
    "path": "./rulesets/loyalsoldier/google.yaml"
  },
  "icloud": {
    ...ruleProviderCommon,
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./rulesets/loyalsoldier/icloud.yaml"
  },
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./rulesets/loyalsoldier/lancidr.yaml"
  },
  "openai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/OpenAI.yaml",
    "path": "./rulesets/openai.yaml"
  },
  "private": {
    ...ruleProviderCommon,
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./rulesets/loyalsoldier/private.yaml"
  },
  "proxy": {
    ...ruleProviderCommon,
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./rulesets/loyalsoldier/proxy.yaml"
  },
  "reject": {
    ...ruleProviderCommon,
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./rulesets/loyalsoldier/reject.yaml"
  },
  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./rulesets/loyalsoldier/telegramcidr.yaml"
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./rulesets/loyalsoldier/tld-not-cn.yaml"
  }
};
// 规则
const rules = [
  // 自定义规则
  "DOMAIN,cm.cumslut.site,全局直连", 
  "DOMAIN-SUFFIX,googleapis.cn,节点选择", // Google服务
  "DOMAIN-SUFFIX,gstatic.com,节点选择", // Google静态资源
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,节点选择", // Google Play下载服务
  // Loyalsoldier 规则集
  "RULE-SET,applications,全局直连",
  "RULE-SET,private,全局直连",
  "RULE-SET,reject,广告过滤",
  "RULE-SET,icloud,微软服务",
  "RULE-SET,apple,苹果服务",
  "RULE-SET,google,谷歌服务",
  "RULE-SET,openai,OpenAI",
  "RULE-SET,gfw,节点选择",
  "RULE-SET,proxy,节点选择",
  "RULE-SET,tld-not-cn,节点选择",
  "RULE-SET,direct,全局直连",
  "RULE-SET,lancidr,全局直连,no-resolve",
  "RULE-SET,cncidr,全局直连,no-resolve",
  "RULE-SET,telegramcidr,电报消息,no-resolve",
  // 其他规则
  "GEOIP,LAN,全局直连,no-resolve",
  "GEOIP,CN,全局直连,no-resolve",
  "MATCH,漏网之鱼"
];
  // 代理组通用配置
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};

  // proxies 自定义前置节点
const proxies = [ ];

// 定义 proxy-providers
const proxyProviders = {
  "yaml节点": {
    "type": "file",
    "interval": 3600,
    "path": "C:\\Users\\Administrator\\Desktop\\yaml.yaml"
  },
  "url节点": {
    "type": "file",
    "interval": 3600,
    "path": "C:\\Users\\Administrator\\Desktop\\url.yaml"
  },
  "ariport节点": {
    "type": "http",
    "interval": 3600,
    "url": "https://xb.xboard.com/user?token=1234567890",
    "path": ".\\ariport.yaml",
    "filter": "(?i)香港" 
  }
};
  // 正则表达式定义
  const hongKongRegex = /香港|HK|Hong|🇭🇰/i;
  const taiwanRegex = /台湾|TW|Taiwan|Wan|🇨🇳|🇹🇼/i;
  const singaporeRegex = /新加坡|狮城|SG|Singapore|🇸🇬/i;
  const japanRegex = /日本|JP|Japan|🇯🇵/i;
  const americaRegex = /美国|US|United States|America|🇺🇸/;
  const othersRegex = /^(?!.*(?:香港|HK|Hong|🇭🇰|台湾|TW|Taiwan|Wan|🇨🇳|🇹🇼|新加坡|SG|Singapore|狮城|🇸🇬|日本|JP|Japan|🇯🇵|美国|US|States|America|🇺🇸|自动|故障|流量|官网|套餐|机场|订阅|年|月)).*$/;
  const allRegex = /^(?!.*(?:自动|故障|流量|官网|套餐|机场|订阅|年|月|失联|频道)).*$/;

  // proxies 节点正则匹配
  function getProxiesByRegex(config, regex) {
  return config.proxies
    .filter((e) => regex.test(e.name))
    .map((e) => e.name);
  }

  // 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 分地区获取节点
  const hongKongProxies = getProxiesByRegex(config, hongKongRegex);
  const taiwanProxies = getProxiesByRegex(config, taiwanRegex);
  const singaporeProxies = getProxiesByRegex(config, singaporeRegex);
  const japanProxies = getProxiesByRegex(config, japanRegex);
  const americaProxies = getProxiesByRegex(config, americaRegex);
  const othersProxies = getProxiesByRegex(config, othersRegex);
  const allProxies = getProxiesByRegex(config, allRegex);

  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
      {
        ...groupBaseOption,
        "name": "节点选择",
        "type": "select",
        "proxies": ["relay", "前置", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HongKong", "TaiWan", "Singapore", "Japan", "America", "Others"],
        "include-all": true,
        "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
      },
      {
        ...groupBaseOption,
        "name": "前置",
        "type": "select",
        "proxies": [ "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HongKong", "TaiWan", "Singapore", "Japan", "America", "Others"],
        "include-all": true,
        // "include-all-providers": true,
        "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/cloudflare.svg"
    },
    {
        ...groupBaseOption,
        "name": "出口",
        "type": "select",
        "proxies": [],
        "include-all": true,
        "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "relay",
      "type": "relay",
      "proxies": ["前置", "出口"],
      "hidden": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "延迟选优",
      "type": "url-test",
      "tolerance": 50,
      "include-all": true,
      "hidden": false,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },
    {
      ...groupBaseOption,
      "name": "故障转移",
      "type": "fallback",
      "include-all": true,
      "hidden": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "hidden": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(轮询)",
      "type": "load-balance",
      "strategy": "round-robin",
      "include-all": true,
      "hidden": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    },
    {
      ...groupBaseOption,
      "name": "谷歌服务",
      "type": "select",
      "proxies": ["节点选择", "relay", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HongKong", "TaiWan", "Singapore", "Japan", "America", "Others"],
      "include-all": true,
      "hidden": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "国外媒体",
      "type": "select",
      "proxies": ["节点选择", "relay", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HongKong", "TaiWan", "Singapore", "Japan", "America", "Others"],
      "include-all": true,
      "hidden": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },
    {
      ...groupBaseOption,
      "name": "电报消息",
      "type": "select",
      "proxies": ["节点选择", "relay", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HongKong", "TaiWan", "Singapore", "Japan", "America", "Others"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },
    {
      ...groupBaseOption,
      "name": "微软服务",
      "type": "select",
      "proxies": ["全局直连", "节点选择", "relay", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HongKong", "TaiWan", "Singapore", "Japan", "America", "Others"],
      "include-all": true,
      "hidden": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },
    {
      ...groupBaseOption,
      "name": "苹果服务",
      "type": "select",
      "proxies": ["全局直连","relay", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HongKong", "TaiWan", "Singapore", "Japan", "America", "Others"],
      "include-all": true,
      "hidden": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      ...groupBaseOption,
      "name": "广告过滤",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "hidden": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
    },
    {
      ...groupBaseOption,
      "name": "全局直连",
      "type": "select",
      "proxies": ["DIRECT", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      "include-all": true,
      "hidden": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "全局拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "hidden": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
    },
    {
      ...groupBaseOption,
      "name": "漏网之鱼",
      "type": "select",
      "proxies": ["节点选择", "relay", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HongKong", "TaiWan", "Singapore", "Japan", "America", "Others"],
      "include-all": true,
      "hidden": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    },
    {
      ...groupBaseOption,
      "name": "OpenAI",
      "type": "select",
      "proxies": ["节点选择", "relay", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HongKong", "TaiWan", "Singapore", "Japan", "America", "Others"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/lige47/QuanX-icon-rule@main/icon/ChatGPT-green.png"
    },

  // 香港地区
    {
        ...groupBaseOption,
        name: "HongKong",
        "type": "select",
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg",
        proxies: hongKongProxies.length > 0 ? hongKongProxies : ["DIRECT"]
    },
  // 台湾地区
    {
        ...groupBaseOption,
        name: "TaiWan",
        "type": "select",
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/tw.svg",
        proxies: taiwanProxies.length > 0 ? taiwanProxies : ["DIRECT"]
    },
  // 狮城
    {
        ...groupBaseOption,
        name: "Singapore",
        "type": "select",
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/sg.svg",
        proxies: singaporeProxies.length > 0 ? singaporeProxies : ["DIRECT"]
    },
  // 日本
    {
        ...groupBaseOption,
        name: "Japan",
        "type": "select",
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/jp.svg",
        proxies: japanProxies.length > 0 ? japanProxies : ["DIRECT"]
    },
  // 美国
    {
        ...groupBaseOption,
        name: "America",
        "type": "select",
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/us.svg",
        proxies: americaProxies.length > 0 ? americaProxies : ["DIRECT"]
    },
  // 其他
    {
        ...groupBaseOption,
        name: "Others",
        "type": "select",
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/unknown.svg",
        proxies: othersProxies.length > 0 ? othersProxies : ["DIRECT"]
    }

];

  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;

  // 追加新的proxies到原配置中
  if (!config["proxies"]) {
      config["proxies"] = [];
  }
  config["proxies"] = config["proxies"].concat(proxies);

  // 将 proxy-providers 添加到配置中
  config["proxy-providers"] = proxyProviders;

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  // 返回修改后的配置
  return config;
  
}
