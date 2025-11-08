import { BookCopyIcon, EarthIcon, ExpandIcon, Layers3Icon, LockKeyholeIcon, ShieldIcon } from "lucide-react";

const features = [
  {
    "title": "Cross-Cloud",
    "description": "RustFS leverages distributed architecture and object storage capabilities to provide excellent performance for AI and advanced analytics workloads, supporting data scaling from TB to EB levels.",
    "icon": EarthIcon,
    "url": "#",
    "featureDescription": "Cross-cloud support can effectively prevent single cloud failures and major losses. You can use RustFS as a communication tool across clouds. We support bucket-level granular execution, which is used in the following scenarios:",
    "features": [
      "Active-active cross-region/availability zone replication",
      "Legal hold, governance and compliance",
      "FINRA Rule 4511 and CFTC regulations"
    ],
    "review": {
      "name": "Adrian Miller",
      "position": "CTO",
      "img": "/images/faces/adrian-miller.jpeg",
      "review": "RustFS's cross-cloud support can effectively prevent single cloud failures and major losses"
    }
  },
  {
    "title": "Secure & Reliable",
    "description": "RustFS integrates with RustyVault to provide high-performance object storage security encryption, supporting multiple encryption modes to ensure data security and transparency.",
    "icon": ShieldIcon,
    "url": "#",
    "featureDescription": "RustyVault is an open-source object storage encryption tool that provides high performance, cross-platform compatibility, easy integration, and multiple encryption modes. RustyVault ensures data security and transparency through data encryption.",
    "features": [
      "High performance - better encryption/decryption performance than other products",
      "Security - better security through rotation methods",
      "Easy integration - RustyVault provides simple APIs and command-line tools"
    ],
    "review": {
      "name": "Sophia Grant",
      "position": "CTO",
      "img": "/images/faces/sophia-grant.jpeg",
      "review": "RustFS integrates very conveniently with Vault products, ensuring our data compliance and security encryption needs"
    }
  },
  {
    "title": "Version Control",
    "description": "Object storage version control feature assigns unique identifiers to each object version, allowing users to access and manage historical versions through APIs or management interfaces.",
    "icon": Layers3Icon,
    "url": "#",
    "featureDescription": "Object storage is a data storage architecture used to store and manage large amounts of unstructured data, such as images, videos, documents, and backups. Version control is a feature of object storage that allows users to save and access multiple versions of an object:",
    "features": [
      "Data protection and recovery - version control allows users to restore to previous versions",
      "Historical tracking - version control records the historical changes of each object",
      "Collaboration and concurrent editing - multiple users can work independently without affecting the main version"
    ],
    "review": {
      "name": "Liam Harper",
      "position": "Senior Engineer",
      "img": "/images/faces/liam-harper.jpeg",
      "review": "Since each version is saved in object storage, the backup and recovery process becomes much simpler"
    }
  },
  {
    "title": "Unlimited Scaling",
    "description": "RustFS system automatically balances node loads, ensures even data distribution, supports dynamic addition or removal of resources based on storage needs, achieving unlimited scaling.",
    "icon": ExpandIcon,
    "url": "#",
    "featureDescription": "RustFS supports unlimited scaling and massive data storage, easily handling large-scale data storage requirements. RustFS storage capacity can expand infinitely as data volume grows, without being limited by storage capacity constraints.",
    "features": [
      "Distributed architecture - data is distributed across multiple nodes",
      "Data sharding - large objects may be split into multiple small chunks",
      "No central metadata server - avoids centralized metadata server failures and service interruptions"
    ],
    "review": {
      "name": "Noah Carter",
      "position": "Database Engineer",
      "img": "/images/faces/noah-carter.jpeg",
      "review": "Any node interruption or damage will not affect data security"
    }
  },
  {
    "title": "Object Read-Only",
    "description": "Supports object locking mode, implementing WORM (Write Once, Read Many) functionality, preventing data from being modified or deleted within specified time ranges, ensuring data integrity.",
    "icon": LockKeyholeIcon,
    "url": "#",
    "featureDescription": "WORM (Write Once, Read Many) in object storage is a data storage characteristic that ensures once data is written and solidified, it cannot be modified or deleted. The benefits of WORM include the following features:",
    "features": [
      "Data protection - prevents data from being accidentally or intentionally modified",
      "Compliance - certain industries need to comply with specific regulations",
      "Audit and evidence retention - this is very important for legal proceedings and investigations"
    ],
    "review": {
      "name": "Isabella Rhodes",
      "position": "CEO",
      "img": "/images/faces/isabella-rhodes.jpeg",
      "review": "Our data is not allowed to be deleted, which is more in line with legal requirements"
    }
  },
  {
    "title": "Active Replication",
    "description": "Automatically creates multiple copies when objects are written and distributes them to different nodes, supports synchronous and asynchronous replication modes, providing high availability and disaster recovery capabilities.",
    "icon": BookCopyIcon,
    "url": "#",
    "featureDescription": "Active Replication in object storage is a data redundancy strategy that involves replicating data between multiple geographic locations or data centers. These replicas can be synchronously or asynchronously replicated:",
    "features": [
      "High availability - better balance and scalability ensure services are provided at locations closest to users",
      "Disaster recovery - other regions take over when regional failures or disasters occur",
      "Geographic redundancy - provides highly reliable services to customers globally"
    ],
    "review": {
      "name": "James Porter",
      "position": "CEO",
      "img": "/images/faces/james-porter.jpeg",
      "review": "For unstructured data, it saves more costs than traditional SAN storage"
    }
  }
];

export default features;

