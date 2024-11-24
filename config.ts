import authors from '@contents/data/authors.json';

const siteConfig = {
  title: "RustFS | MinIO国产化替代方案, 高性能分布式存储",
  description: "RustFS使用全球最热,性能最好的内存安全Rust语言开发的高性能对象存储是开源的、兼容S3、oss 的Kubernetes原生云存储,专为 AI 等云原生工作负载而设计。适合企业构建私有云存储、混合云存储和分布式存储,也是是MinIO的国产化替代方案。",
  url: "https://rustfs.com",
  keywords: "对象存储,MinIO国产化替代,ceph国产化替代方案，分布式存储,MinIO的国产化,混合云存储,oss,oss私有化, minio国产化替代方案,分布式云存储，云存储、私有云存储,混合云存储，多云, 混合云, 对象存储, 用于AI的对象存储, 云存储,开源存储,sds, oss私有化, 跨云存储, 块存储, NAS,juicefs,  Gluster, 备份存储,私有云存储,同城灾备存储, 跨云存储",
  topNavLinks: [
    {
      name: "产品功能", id: 'features', href: "#", type: 'dropdown', groupd: true, children: [
        {
          name: '特征', href: null, type: 'dropdown', children: [
            { name: 'S3兼容', href: "/features/s3-compatibility" },
            { name: '版本控制', href: "/features/versioning" },
            { name: '可扩展', href: "/features/scalable" },
            { name: '日志审计', href: "/features/audit-logging" },
          ]
        },
        {
          name: 'Futures', href: null, type: 'dropdown', children: [
            { name: '加密', href: "/features/encryption" },
            { name: '生命周期管理', href: "/features/lifecycle" },
            { name: '桶复制', href: "/features/bucket-replication" },
            { name: '只读', href: "/features/worm" },
            { name: '信创支持', href: "/features/domestic" },
          ]
        },
        {
          name: '可视化监控', href: null, type: 'dropdown', children: [
            { name: '分布式可扩展', href: "/features/distributed", description: "RustFS是非常强劲的分布式存储产品，通过pools去管理分布式集群让分布式集群可以无限向上扩展，轻松实现EB级存储" },
            { name: '监控报警', href: "/features/audit-logging", description: "RustFS可以通过prometheus全面的完成对集群的监控和报警，通过设置alerts规则，实时了解告警状态，保障产生可靠" },
          ]
        },
        {
          name: '大数据和AI', href: null, type: 'dropdown', children: [
            { name: '人工智能', href: "/features/ai" },
            { name: '小文件优化', href: "/features/small-file" },
            { name: '数据湖支持', href: "/features/data-lake" },
            { name: '存算分离', href: "/features/hdfs" },
          ]
        },
      ]
    },
    {
      name: "架构", id: 'structor', href: "#", type: 'dropdown', groupd: true, children: [
        {
          name: '虚拟化和国产化支持', href: null, type: 'dropdown', children: [
            { name: 'vmware 虚拟化', href: "/features/tanzu" },
            { name: 'KVM 和国产虚拟化', href: "/features/baremetal" },
            { name: '信创和商密支持', href: "/features/domestic" },
          ]
        },
        {
          name: '云支持', href: null, type: 'dropdown', children: [
            { name: '阿里云', href: "/features/aliyun" },
            { name: '腾讯云', href: "/features/qcloud" },
            { name: '华为云', href: "/features/huaweicloud" },
            { name: '国际其他云厂商', href: "/features/aws-elastic" },
          ]
        },
        {
          name: '私有云和混合云', href: null, type: 'dropdown', children: [
            { name: '私有云和混合云', href: "/features/baremetal", description: "RustFS可以在私有云和裸金属私有云下完成部署，通过虚批化和裸金属均可构建私通过虚批化和裸金属均可构建私" },
          ]
        },
        {
          name: '云原生', href: null, type: 'dropdown', children: [
            { name: 'Kubernetes', href: "/features/cloud-native" },
            { name: 'OpenShift', href: "/features/openshift" },
            { name: 'Tanzu', href: "/features/tanzu" },
            { name: 'SUSE Rancher', href: "/features/suse-rancher" },
          ]
        },
      ]
    },
    {
      name: "解决方案", id: 'solutions', href: "#", type: 'dropdown', groupd: false, children: [
        { name: '现代数据湖', href: "/features/data-lake", description: "现代数据湖和数据湖仓一体建立在现代对象存储之上。这意味着它们建立在 RustFS 之上。" },
        { name: '云原生', href: "/features/cloud", description: "混合/多云架构可实现一致的性能、安全性 和经济性。任何关于多云的讨论都需要从一个定义开始。 它不仅仅是一个单一的公共云和本地。" },
        { name: '制造业降本', href: "/features/industry", description: "制造业通过的AI质检、视频存储、图像存储中需要大量进行高清图片和高清视频的存储，急需降低存储成本。" },
        { name: 'AI 和机器学习', href: "/features/ai", description: "我们是高性能对象存储。" },
        { name: 'HDFS', href: "/features/hdfs", description: "未来是分解的，S3兼容和Kubernetes原生 - 换句话说， 除了Hadoop HDFS之外的东西。" },
        { name: '视频存储降本方案', href: "/features/video", description: "在某些重要场景，视频需要存储长达数10年，海量的视频存储占用了大量的空间，急需要降低视频存取时的成本和提升吞吐" },
        { name: 'Veeam 备份', href: "/features/veeam", description: "面向 Veeam Backup and Replication 的高性能对象存储" },
        { name: '康沃备份', href: "/features/commvault", description: "用于 Commvault 备份、恢复和复制的高性能对象存储。简单、可伸缩、快、防勒索软件。换句话说，正是你想要的。" },
        { name: '冷归档存储', href: "/features/cold-archiving", description: "使用RustFS分布式对象存储与蓝光存储相结合，将数据在脱电状态下保存数百年，极大的降低数据归档的存储成本。" },
        { name: 'SQL 支持', href: "/features/sql", description: "利用 RustFS 的强大功能，使用外部表函数和 polybase 在任何云（ 公有云、私有云或边缘云）上运行 SQL Server 2022。" },
        { name: '量化交易', href: "/features/quantitative-trading", description: "量化交易 文件存储解决方案，如果希望进一步了解，我们可以安排 1:1 会议为你介绍和演示" },
        { name: '国产信创和 SM 方案', href: "/features/domestic", description: "全面提供从硬件、操作系统到涉密、加密的全套存储解决方案" },
      ]
    },
    { name: "集成", href: "/features/integration", },
    { name: "AI 支持", href: "/features/ai", },
    { name: "数据湖", href: "/features/data-lake", },
    { name: "文档", href: "/docs/", },
    { name: "博客", href: "/blog/", },
    { name: "关于我们", href: "/about", }
  ],
  algolia: {
    appId: '',
    apiKey: '',
    indexName: '',
  },
  defaultAuthor: authors['rustfs'],
};

export default siteConfig;
