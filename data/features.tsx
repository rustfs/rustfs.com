import { BookCopyIcon, EarthIcon, ExpandIcon, Layers3Icon, LockKeyholeIcon, ShieldIcon } from "lucide-react";

const features =
  [
    {
      "title": "跨云支持",
      "description": "RustFS 利用分布式架构和对象存储功能，为AI和高级分析工作负载提供卓越性能，支持从TB到EB级别的数据扩展。",
      "icon": EarthIcon,
      "url": "#",
      "featureDescription": "跨云支持能够很好的防止单云故障，造成重大的损失，可以跨云使用RustFS作为通信工具。我们支持桶级别的粒度执行，它用于以下情况：",
      "features": [
        '主动-主动跨区域/可用区复制',
        '法律保留、治理和合规性',
        'FINRA 规则 4511 和 CFTC 法规',
      ],
      "review": {
        "name": '王小明',
        "position": 'CTO',
        "img": '/images/faces/wangxiaoming.jpeg',
        "review": 'RustFS的跨云支持能够很好的防止单云故障，造成重大的损失',
      }
    },
    {
      "title": "安全可靠",
      "description": "RustFS 与 RustyVault 集成，提供高性能的对象存储安全加密，支持多种加密模式，确保数据安全性和透明度。",
      "icon": ShieldIcon,
      "url": "#",
      "featureDescription": "RustyVault 是一个开源的对象存储加密工具，它提供了高性能、跨平台、易于集成和多种加密模式的优点。RustyVault 通过对数据进行加密，保证了数据的安全性和透明度。",
      "features": [
        '高性能 - 比其他产品的加解密性能更高',
        '安全性 - 轮转的方式获得更好的安全性',
        '易于集成 - RustyVault提供了简单的API和命令行工具',
      ],
      "review": {
        "name": '孙立',
        "position": 'CTO',
        "img": '/images/faces/sunli.jpeg',
        "review": 'RustFS与Vault产品集成非常方便，保障了我们的数据合规和安全加密的需要',
      }
    },
    {
      "title": "版本控制",
      "description": "对象存储版本控制功能，为每个对象版本分配唯一标识符，用户可通过API或管理界面访问和管理历史版本。",
      "icon": Layers3Icon,
      "url": "#",
      "featureDescription": "对象存储是一种数据存储架构，它用于存储和管理大量非结构化数据，如图片、视频、文档和备份。版本控制是对象存储的一个功能，它允许用户保存和访问一个对象的多个版本：",
      "features": [
        '数据保护和恢复 - 版本控制允许用户恢复到之前的版本',
        '历史追踪 - 版本控制记录了每个对象的历史变化',
        '协作和并发编辑 - 多用户不影响主版本独立工作',
      ],
      "review": {
        "name": '李在恒',
        "position": '高级工程师',
        "img": '/images/faces/lizaiheng.jpeg',
        "review": '由于每个版本都保存在对象存储中，因此备份和恢复过程变得更加简单',
      }
    },
    {
      "title": "无限扩容",
      "description": "RustFS系统自动平衡节点负载，确保数据均匀分布，支持根据存储需求动态添加或移除资源，实现无限扩容。",
      "icon": ExpandIcon,
      "url": "#",
      "featureDescription": "RustFS支持无限扩容，支持海量数据存储，可以轻松应对大规模数据存储需求。RustFS的存储容量可以随着数据量的增长而无限扩展，不会受到存储容量的限制。",
      "features": [
        '分布式架构 - 数据被分散存储在多个节点上',
        '数据分片 - 大型对象可能会被分割成多个小块',
        '无中心元数据服务器 - 避免了中心化的元数据服务器损坏和中断服务',
      ],
      "review": {
        "name": '吴景宇',
        "position": '数据库工程师',
        "img": '/images/faces/wujingyu.jpeg',
        "review": '任何节点的中断和损坏都不会影响到数据的安全',
      }
    },
    {
      "title": "对象只读",
      "description": "支持对象锁定模式，实现WORM（写一次读多次）功能，防止数据在指定时间范围内被修改或删除，确保数据完整性。",
      "icon": LockKeyholeIcon,
      "url": "#",
      "featureDescription": "对象存储的WORM（Write Once, Read Many）是一种数据存储特性，它确保一旦数据被写入并固化，就无法被修改或删除。 WORM 的好处包括如下特点：",
      "features": [
        '数据保护 - 防止数据被意外或故意修改',
        '合规性 - 某些行业需要遵守特定的法规',
        '审计和证据保留 - 这对于法律诉讼和调查非常重要',
      ],
      "review": {
        "name": '魏一鸣',
        "position": 'CEO',
        "img": '/images/faces/weiyiming.jpeg',
        "review": '我们的数据不准许被删除，更加符合法律的规定',
      }
    },
    {
      "title": "主动复制",
      "description": "对象写入时自动创建多个副本并分布到不同节点，支持同步和异步复制模式，提供高可用性和灾难恢复能力。",
      "icon": BookCopyIcon,
      "url": "#",
      "featureDescription": "对象存储的主动复制（Active Replication）是一种数据冗余策略，它涉及在多个地理位置或数据中心之间复制数据，这些副本可以是同步复制的，也可以是异步复制的：",
      "features": [
        '高可用性 - 更高的平衡和扩展性保证离用户最近的位置提供服务',
        '灾难恢复 - 在发生区域性故障或灾难时，其他区域接管',
        '地理冗余 - 在全球范围为客户提供高可靠的服务',
      ],
      "review": {
        "name": '张小龙',
        "position": 'CEO',
        "img": '/images/faces/sunli.jpeg',
        "review": '在非结构化数据上，比传统的SAN存储节省了更多的成本',
      }
    },
  ]

export default features;
