import { BookCopyIcon, EarthIcon, ExpandIcon, Layers3Icon, LockKeyholeIcon, ShieldIcon } from "lucide-react";

const features =
  [
    {
      "title": {
        "zh": "跨云支持",
        "en": "Cross-Cloud Support"
      },
      "description": {
        "zh": "RustFS 利用分布式架构和对象存储功能，为AI和高级分析工作负载提供卓越性能，支持从TB到EB级别的数据扩展。",
        "en": "RustFS leverages distributed architecture and object storage capabilities to provide excellent performance for AI and advanced analytics workloads, supporting data scaling from TB to EB levels."
      },
      "icon": EarthIcon,
      "url": "#",
      "featureDescription": {
        "zh": "跨云支持能够很好的防止单云故障，造成重大的损失，可以跨云使用RustFS作为通信工具。我们支持桶级别的粒度执行，它用于以下情况：",
        "en": "Cross-cloud support can effectively prevent single cloud failures and major losses. You can use RustFS as a communication tool across clouds. We support bucket-level granular execution, which is used in the following scenarios:"
      },
      "features": [
        {
          "zh": "主动-主动跨区域/可用区复制",
          "en": "Active-active cross-region/availability zone replication"
        },
        {
          "zh": "法律保留、治理和合规性",
          "en": "Legal hold, governance and compliance"
        },
        {
          "zh": "FINRA 规则 4511 和 CFTC 法规",
          "en": "FINRA Rule 4511 and CFTC regulations"
        }
      ],
      "review": {
        "name": {
          "zh": "王小明",
          "en": "Wang Xiaoming"
        },
        "position": {
          "zh": "CTO",
          "en": "CTO"
        },
        "img": "/images/faces/wangxiaoming.jpeg",
        "review": {
          "zh": "RustFS的跨云支持能够很好的防止单云故障，造成重大的损失",
          "en": "RustFS's cross-cloud support can effectively prevent single cloud failures and major losses"
        }
      }
    },
    {
      "title": {
        "zh": "安全可靠",
        "en": "Secure and Reliable"
      },
      "description": {
        "zh": "RustFS 与 RustyVault 集成，提供高性能的对象存储安全加密，支持多种加密模式，确保数据安全性和透明度。",
        "en": "RustFS integrates with RustyVault to provide high-performance object storage security encryption, supporting multiple encryption modes to ensure data security and transparency."
      },
      "icon": ShieldIcon,
      "url": "#",
      "featureDescription": {
        "zh": "RustyVault 是一个开源的对象存储加密工具，它提供了高性能、跨平台、易于集成和多种加密模式的优点。RustyVault 通过对数据进行加密，保证了数据的安全性和透明度。",
        "en": "RustyVault is an open-source object storage encryption tool that provides high performance, cross-platform compatibility, easy integration, and multiple encryption modes. RustyVault ensures data security and transparency through data encryption."
      },
      "features": [
        {
          "zh": "高性能 - 比其他产品的加解密性能更高",
          "en": "High performance - better encryption/decryption performance than other products"
        },
        {
          "zh": "安全性 - 轮转的方式获得更好的安全性",
          "en": "Security - better security through rotation methods"
        },
        {
          "zh": "易于集成 - RustyVault提供了简单的API和命令行工具",
          "en": "Easy integration - RustyVault provides simple APIs and command-line tools"
        }
      ],
      "review": {
        "name": {
          "zh": "孙立",
          "en": "Sun Li"
        },
        "position": {
          "zh": "CTO",
          "en": "CTO"
        },
        "img": "/images/faces/sunli.jpeg",
        "review": {
          "zh": "RustFS与Vault产品集成非常方便，保障了我们的数据合规和安全加密的需要",
          "en": "RustFS integrates very conveniently with Vault products, ensuring our data compliance and security encryption needs"
        }
      }
    },
    {
      "title": {
        "zh": "版本控制",
        "en": "Version Control"
      },
      "description": {
        "zh": "对象存储版本控制功能，为每个对象版本分配唯一标识符，用户可通过API或管理界面访问和管理历史版本。",
        "en": "Object storage version control feature assigns unique identifiers to each object version, allowing users to access and manage historical versions through APIs or management interfaces."
      },
      "icon": Layers3Icon,
      "url": "#",
      "featureDescription": {
        "zh": "对象存储是一种数据存储架构，它用于存储和管理大量非结构化数据，如图片、视频、文档和备份。版本控制是对象存储的一个功能，它允许用户保存和访问一个对象的多个版本：",
        "en": "Object storage is a data storage architecture used to store and manage large amounts of unstructured data, such as images, videos, documents, and backups. Version control is a feature of object storage that allows users to save and access multiple versions of an object:"
      },
      "features": [
        {
          "zh": "数据保护和恢复 - 版本控制允许用户恢复到之前的版本",
          "en": "Data protection and recovery - version control allows users to restore to previous versions"
        },
        {
          "zh": "历史追踪 - 版本控制记录了每个对象的历史变化",
          "en": "Historical tracking - version control records the historical changes of each object"
        },
        {
          "zh": "协作和并发编辑 - 多用户不影响主版本独立工作",
          "en": "Collaboration and concurrent editing - multiple users can work independently without affecting the main version"
        }
      ],
      "review": {
        "name": {
          "zh": "李在恒",
          "en": "Li Zaiheng"
        },
        "position": {
          "zh": "高级工程师",
          "en": "Senior Engineer"
        },
        "img": "/images/faces/lizaiheng.jpeg",
        "review": {
          "zh": "由于每个版本都保存在对象存储中，因此备份和恢复过程变得更加简单",
          "en": "Since each version is saved in object storage, the backup and recovery process becomes much simpler"
        }
      }
    },
    {
      "title": {
        "zh": "无限扩容",
        "en": "Unlimited Scaling"
      },
      "description": {
        "zh": "RustFS系统自动平衡节点负载，确保数据均匀分布，支持根据存储需求动态添加或移除资源，实现无限扩容。",
        "en": "RustFS system automatically balances node loads, ensures even data distribution, supports dynamic addition or removal of resources based on storage needs, achieving unlimited scaling."
      },
      "icon": ExpandIcon,
      "url": "#",
      "featureDescription": {
        "zh": "RustFS支持无限扩容，支持海量数据存储，可以轻松应对大规模数据存储需求。RustFS的存储容量可以随着数据量的增长而无限扩展，不会受到存储容量的限制。",
        "en": "RustFS supports unlimited scaling and massive data storage, easily handling large-scale data storage requirements. RustFS storage capacity can expand infinitely as data volume grows, without being limited by storage capacity constraints."
      },
      "features": [
        {
          "zh": "分布式架构 - 数据被分散存储在多个节点上",
          "en": "Distributed architecture - data is distributed across multiple nodes"
        },
        {
          "zh": "数据分片 - 大型对象可能会被分割成多个小块",
          "en": "Data sharding - large objects may be split into multiple small chunks"
        },
        {
          "zh": "无中心元数据服务器 - 避免了中心化的元数据服务器损坏和中断服务",
          "en": "No central metadata server - avoids centralized metadata server failures and service interruptions"
        }
      ],
      "review": {
        "name": {
          "zh": "吴景宇",
          "en": "Wu Jingyu"
        },
        "position": {
          "zh": "数据库工程师",
          "en": "Database Engineer"
        },
        "img": "/images/faces/wujingyu.jpeg",
        "review": {
          "zh": "任何节点的中断和损坏都不会影响到数据的安全",
          "en": "Any node interruption or damage will not affect data security"
        }
      }
    },
    {
      "title": {
        "zh": "对象只读",
        "en": "Object Read-Only"
      },
      "description": {
        "zh": "支持对象锁定模式，实现WORM（写一次读多次）功能，防止数据在指定时间范围内被修改或删除，确保数据完整性。",
        "en": "Supports object locking mode, implementing WORM (Write Once, Read Many) functionality, preventing data from being modified or deleted within specified time ranges, ensuring data integrity."
      },
      "icon": LockKeyholeIcon,
      "url": "#",
      "featureDescription": {
        "zh": "对象存储的WORM（Write Once, Read Many）是一种数据存储特性，它确保一旦数据被写入并固化，就无法被修改或删除。 WORM 的好处包括如下特点：",
        "en": "WORM (Write Once, Read Many) in object storage is a data storage characteristic that ensures once data is written and solidified, it cannot be modified or deleted. The benefits of WORM include the following features:"
      },
      "features": [
        {
          "zh": "数据保护 - 防止数据被意外或故意修改",
          "en": "Data protection - prevents data from being accidentally or intentionally modified"
        },
        {
          "zh": "合规性 - 某些行业需要遵守特定的法规",
          "en": "Compliance - certain industries need to comply with specific regulations"
        },
        {
          "zh": "审计和证据保留 - 这对于法律诉讼和调查非常重要",
          "en": "Audit and evidence retention - this is very important for legal proceedings and investigations"
        }
      ],
      "review": {
        "name": {
          "zh": "魏一鸣",
          "en": "Wei Yiming"
        },
        "position": {
          "zh": "CEO",
          "en": "CEO"
        },
        "img": "/images/faces/weiyiming.jpeg",
        "review": {
          "zh": "我们的数据不准许被删除，更加符合法律的规定",
          "en": "Our data is not allowed to be deleted, which is more in line with legal requirements"
        }
      }
    },
    {
      "title": {
        "zh": "主动复制",
        "en": "Active Replication"
      },
      "description": {
        "zh": "对象写入时自动创建多个副本并分布到不同节点，支持同步和异步复制模式，提供高可用性和灾难恢复能力。",
        "en": "Automatically creates multiple copies when objects are written and distributes them to different nodes, supports synchronous and asynchronous replication modes, providing high availability and disaster recovery capabilities."
      },
      "icon": BookCopyIcon,
      "url": "#",
      "featureDescription": {
        "zh": "对象存储的主动复制（Active Replication）是一种数据冗余策略，它涉及在多个地理位置或数据中心之间复制数据，这些副本可以是同步复制的，也可以是异步复制的：",
        "en": "Active Replication in object storage is a data redundancy strategy that involves replicating data between multiple geographic locations or data centers. These replicas can be synchronously or asynchronously replicated:"
      },
      "features": [
        {
          "zh": "高可用性 - 更高的平衡和扩展性保证离用户最近的位置提供服务",
          "en": "High availability - better balance and scalability ensure services are provided at locations closest to users"
        },
        {
          "zh": "灾难恢复 - 在发生区域性故障或灾难时，其他区域接管",
          "en": "Disaster recovery - other regions take over when regional failures or disasters occur"
        },
        {
          "zh": "地理冗余 - 在全球范围为客户提供高可靠的服务",
          "en": "Geographic redundancy - provides highly reliable services to customers globally"
        }
      ],
      "review": {
        "name": {
          "zh": "张小龙",
          "en": "Zhang Xiaolong"
        },
        "position": {
          "zh": "CEO",
          "en": "CEO"
        },
        "img": "/images/faces/sunli.jpeg",
        "review": {
          "zh": "在非结构化数据上，比传统的SAN存储节省了更多的成本",
          "en": "For unstructured data, it saves more costs than traditional SAN storage"
        }
      }
    }
  ]

export default features;
