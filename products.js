/**
 * ZT Store - بيانات منتجات قطع الكمبيوتر
 * ============================
 * ملف بيانات المنتجات والتصنيفات لمتجر قطع PC
 */

// التصنيفات الرئيسية مع التصنيفات الفرعية
const categories = [
    {
        id: 1,
        name: 'المعالجات',
        slug: 'processors',
        icon: '🔲',
        description: 'معالجات AMD و Intel',
        count: 24,
        subcategories: [
            { id: 101, name: 'AMD', slug: 'processors-amd', icon: '🔴' },
            { id: 102, name: 'Intel', slug: 'processors-intel', icon: '🔵' }
        ]
    },
    {
        id: 2,
        name: 'كروت الشاشة',
        slug: 'graphics-cards',
        icon: '🎮',
        description: 'كروت NVIDIA و AMD',
        count: 32,
        subcategories: [
            { id: 201, name: 'NVIDIA', slug: 'gpu-nvidia', icon: '💚' },
            { id: 202, name: 'AMD Radeon', slug: 'gpu-amd', icon: '❤️' }
        ]
    },
    {
        id: 3,
        name: 'اللوحات الأم',
        slug: 'motherboards',
        icon: '🖥️',
        description: 'لوحات أم لجميع المنصات',
        count: 28,
        subcategories: [
            { id: 301, name: 'لوحات AMD', slug: 'mb-amd', icon: '🔴' },
            { id: 302, name: 'لوحات Intel', slug: 'mb-intel', icon: '🔵' }
        ]
    },
    {
        id: 4,
        name: 'الرامات',
        slug: 'ram',
        icon: '💾',
        description: 'ذواكر DDR4 و DDR5',
        count: 36,
        subcategories: [
            { id: 401, name: 'رامات ديسكتوب', slug: 'ram-desktop', icon: '🖥️' },
            { id: 402, name: 'رامات لابتوب', slug: 'ram-laptop', icon: '💻' }
        ]
    },
    {
        id: 5,
        name: 'التخزين',
        slug: 'storage',
        icon: '💿',
        description: 'SSD و HDD و M.2',
        count: 42,
        subcategories: [
            { id: 501, name: 'SSD', slug: 'storage-ssd', icon: '⚡' },
            { id: 502, name: 'HDD', slug: 'storage-hdd', icon: '💽' },
            { id: 503, name: 'M.2 NVMe', slug: 'storage-m2', icon: '🚀' }
        ]
    },
    {
        id: 6,
        name: 'التبريد',
        slug: 'cooling',
        icon: '❄️',
        description: 'مبردات هوائية ومائية',
        count: 30,
        subcategories: [
            { id: 601, name: 'تبريد مائي', slug: 'cooling-liquid', icon: '💧' },
            { id: 602, name: 'تبريد هوائي', slug: 'cooling-air', icon: '🌀' },
            { id: 603, name: 'مراوح الكيس', slug: 'cooling-fans', icon: '🔄' },
            { id: 604, name: 'معجون حراري', slug: 'cooling-paste', icon: '🧴' },
            { id: 605, name: 'لبادة حرارية', slug: 'cooling-pads', icon: '📋' }
        ]
    },
    {
        id: 7,
        name: 'مزودات الطاقة',
        slug: 'psu',
        icon: '⚡',
        description: 'PSU بقدرات مختلفة',
        count: 20,
        subcategories: null
    },
    {
        id: 8,
        name: 'كيسات الكمبيوتر',
        slug: 'cases',
        icon: '🗄️',
        description: 'كيسات بأحجام متعددة',
        count: 25,
        subcategories: null
    },
    {
        id: 9,
        name: 'الإكسسوارات',
        slug: 'accessories',
        icon: '🎧',
        description: 'سماعات وكيبورد وماوس',
        count: 55,
        subcategories: [
            { id: 901, name: 'سماعات', slug: 'acc-headsets', icon: '🎧' },
            { id: 902, name: 'كيبوردات', slug: 'acc-keyboards', icon: '⌨️' },
            { id: 903, name: 'ماوسات', slug: 'acc-mice', icon: '🖱️' },
            { id: 904, name: 'ماوس باد', slug: 'acc-mousepads', icon: '🖼️' }
        ]
    }
];

// المنتجات
const products = [
    // ==================== المعالجات ====================
    {
        id: 1,
        name: 'AMD Ryzen 9 7950X',
        slug: 'amd-ryzen-9-7950x',
        category: 'processors',
        subcategory: 'processors-amd',
        categoryName: 'المعالجات',
        price: 850000,
        oldPrice: 950000,
        discount: 11,
        description: 'معالج AMD Ryzen 9 7950X مع 16 نواة و 32 خيط. تردد أساسي 4.5GHz وتردد Boost يصل إلى 5.7GHz. مثالي للألعاب والمونتاج والأعمال الاحترافية.',
        features: [
            '16 نواة / 32 خيط',
            'تردد Boost: 5.7GHz',
            'كاش L3: 64MB',
            'سوكيت AM5',
            'دعم DDR5 و PCIe 5.0'
        ],
        images: [
            'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-9-7900x.jpg',
            'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=600'
        ],
        rating: 4.9,
        reviews: 156,
        stock: 15,
        badge: 'الأفضل'
    },
    {
        id: 2,
        name: 'AMD Ryzen 7 7800X3D',
        slug: 'amd-ryzen-7-7800x3d',
        category: 'processors',
        subcategory: 'processors-amd',
        categoryName: 'المعالجات',
        price: 620000,
        oldPrice: 720000,
        discount: 14,
        description: 'معالج الألعاب الأقوى من AMD مع تقنية 3D V-Cache. 8 نوى و 16 خيط مع 96MB كاش L3 للأداء الاستثنائي في الألعاب.',
        features: [
            '8 نوى / 16 خيط',
            'تردد Boost: 5.0GHz',
            'كاش 3D V-Cache: 96MB',
            'سوكيت AM5',
            'أفضل معالج للألعاب'
        ],
        images: [
            'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-9-7900x.jpg'
        ],
        rating: 4.9,
        reviews: 234,
        stock: 20,
        badge: 'للألعاب'
    },
    {
        id: 3,
        name: 'Intel Core i9-14900K',
        slug: 'intel-core-i9-14900k',
        category: 'processors',
        subcategory: 'processors-intel',
        categoryName: 'المعالجات',
        price: 880000,
        oldPrice: 980000,
        discount: 10,
        description: 'معالج Intel Core i9 الجيل الرابع عشر مع 24 نواة (8P+16E). أداء استثنائي للألعاب والمهام الاحترافية.',
        features: [
            '24 نواة (8P + 16E)',
            'تردد Boost: 6.0GHz',
            'كاش L3: 36MB',
            'سوكيت LGA 1700',
            'دعم DDR5 و PCIe 5.0'
        ],
        images: [
            'https://m.media-amazon.com/images/I/61GbKtxb57L._AC_SL1500_.jpg'
        ],
        rating: 4.8,
        reviews: 189,
        stock: 12,
        badge: 'جديد'
    },
    {
        id: 4,
        name: 'Intel Core i5-14600K',
        slug: 'intel-core-i5-14600k',
        category: 'processors',
        subcategory: 'processors-intel',
        categoryName: 'المعالجات',
        price: 450000,
        oldPrice: 520000,
        discount: 13,
        description: 'معالج Intel Core i5 الجيل الرابع عشر. توازن مثالي بين السعر والأداء للألعاب والمهام اليومية.',
        features: [
            '14 نواة (6P + 8E)',
            'تردد Boost: 5.3GHz',
            'كاش L3: 24MB',
            'سوكيت LGA 1700',
            'قيمة ممتازة مقابل السعر'
        ],
        images: [
            'https://m.media-amazon.com/images/I/61GbKtxb57L._AC_SL1500_.jpg'
        ],
        rating: 4.7,
        reviews: 312,
        stock: 25,
        badge: null
    },

    // ==================== كروت الشاشة ====================
    {
        id: 5,
        name: 'NVIDIA RTX 5090',
        slug: 'nvidia-rtx-5090',
        category: 'graphics-cards',
        subcategory: 'gpu-nvidia',
        categoryName: 'كروت الشاشة',
        price: 2800000,
        oldPrice: 3200000,
        discount: 12,
        description: 'أقوى كرت شاشة في العالم! NVIDIA GeForce RTX 5090 مع 32GB GDDR7X وأداء لا يُضاهى في الألعاب والـ AI.',
        features: [
            '32GB GDDR7X',
            '21,760 CUDA Cores',
            'تردد Boost: 2900MHz',
            'DLSS 4.0 و Ray Tracing',
            'استهلاك 600W'
        ],
        images: [
            'https://cdn.discordapp.com/attachments/1427323350769860668/1456649594069975071/1767360982630.jpg?ex=69592226&is=6957d0a6&hm=0c1dd9247dfb0850e195c4dae657a5ea7a89c8d63d80f1df6480a46cddcd6787&',
            'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600'
        ],
        rating: 5.0,
        reviews: 89,
        stock: 5,
        badge: 'الأقوى'
    },
    {
        id: 6,
        name: 'NVIDIA RTX 4070 Ti Super',
        slug: 'nvidia-rtx-4070-ti-super',
        category: 'graphics-cards',
        subcategory: 'gpu-nvidia',
        categoryName: 'كروت الشاشة',
        price: 1200000,
        oldPrice: 1350000,
        discount: 11,
        description: 'كرت RTX 4070 Ti Super مع 16GB VRAM. أداء ممتاز للألعاب بدقة 1440p و 4K.',
        features: [
            '16GB GDDR6X',
            '8448 CUDA Cores',
            'DLSS 3.0',
            'Ray Tracing محسّن',
            'استهلاك 285W'
        ],
        images: [
            'https://asset.msi.com/resize/image/global/product/product_17046991811c9eb5d51a82095c16a47e5200365e92.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png'
        ],
        rating: 4.8,
        reviews: 145,
        stock: 18,
        badge: 'الأكثر مبيعاً'
    },
    {
        id: 7,
        name: 'AMD RX 7900 XTX',
        slug: 'amd-rx-7900-xtx',
        category: 'graphics-cards',
        subcategory: 'gpu-amd',
        categoryName: 'كروت الشاشة',
        price: 1450000,
        oldPrice: 1650000,
        discount: 12,
        description: 'كرت AMD Radeon RX 7900 XTX الرائد مع 24GB VRAM. منافس قوي لـ RTX 4080.',
        features: [
            '24GB GDDR6',
            '6144 Stream Processors',
            'تردد: 2500MHz',
            'FSR 3.0',
            'استهلاك 355W'
        ],
        images: [
            'https://m.media-amazon.com/images/I/81il2WdPPJL.jpg'
        ],
        rating: 4.7,
        reviews: 98,
        stock: 10,
        badge: null
    },
    {
        id: 8,
        name: 'NVIDIA RTX 4060',
        slug: 'nvidia-rtx-4060',
        category: 'graphics-cards',
        subcategory: 'gpu-nvidia',
        categoryName: 'كروت الشاشة',
        price: 450000,
        oldPrice: 520000,
        discount: 13,
        description: 'كرت RTX 4060 للألعاب بدقة 1080p. أداء ممتاز مع استهلاك طاقة منخفض.',
        features: [
            '8GB GDDR6',
            '3072 CUDA Cores',
            'DLSS 3.0',
            'استهلاك 115W فقط',
            'مثالي لـ 1080p'
        ],
        images: [
            'https://kolshzin.com/wp-content/uploads/2024/12/GeForce-RTX%E2%84%A2-4060-Ti-GAMING-OC-8G-01.webp'
        ],
        rating: 4.5,
        reviews: 267,
        stock: 35,
        badge: 'اقتصادي'
    },

    // ==================== اللوحات الأم ====================
    {
        id: 9,
        name: 'ASUS ROG Crosshair X670E Hero',
        slug: 'asus-rog-x670e-hero',
        category: 'motherboards',
        subcategory: 'mb-amd',
        categoryName: 'اللوحات الأم',
        price: 950000,
        oldPrice: 1100000,
        discount: 14,
        description: 'لوحة أم فاخرة من ASUS ROG لمعالجات AMD Ryzen 7000. دعم DDR5 و PCIe 5.0.',
        features: [
            'سوكيت AM5',
            'شيبست X670E',
            'DDR5 حتى 6400MHz',
            'PCIe 5.0 x16',
            'WiFi 6E و 2.5G LAN'
        ],
        images: [
            'https://kolshzin.com/wp-content/uploads/2025/06/GIGABYTE-X870-GAMING-WIFI6-AMD.webp'
        ],
        rating: 4.9,
        reviews: 67,
        stock: 8,
        badge: 'فاخرة'
    },
    {
        id: 10,
        name: 'MSI MAG B650 TOMAHAWK WiFi',
        slug: 'msi-b650-tomahawk',
        category: 'motherboards',
        subcategory: 'mb-amd',
        categoryName: 'اللوحات الأم',
        price: 350000,
        oldPrice: 420000,
        discount: 17,
        description: 'لوحة أم متوسطة من MSI لمعالجات AMD AM5. خيار ممتاز للسعر.',
        features: [
            'سوكيت AM5',
            'شيبست B650',
            'DDR5 حتى 6000MHz',
            'PCIe 4.0',
            'WiFi 6E'
        ],
        images: [
            'https://kolshzin.com/wp-content/uploads/2025/06/GIGABYTE-X870-GAMING-WIFI6-AMD.webp'
        ],
        rating: 4.6,
        reviews: 134,
        stock: 22,
        badge: null
    },
    {
        id: 11,
        name: 'ASUS ROG Maximus Z790 Hero',
        slug: 'asus-rog-z790-hero',
        category: 'motherboards',
        subcategory: 'mb-intel',
        categoryName: 'اللوحات الأم',
        price: 900000,
        oldPrice: 1050000,
        discount: 14,
        description: 'لوحة أم Intel فاخرة من ASUS ROG للجيل 13 و 14. أفضل خيار للـ Overclocking.',
        features: [
            'سوكيت LGA 1700',
            'شيبست Z790',
            'DDR5 حتى 7800MHz',
            'PCIe 5.0 x16',
            'Thunderbolt 4'
        ],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIIo6Dp_pMLWJPE-vV1fVRw1doymp6XUzk6g&s'
        ],
        rating: 4.9,
        reviews: 78,
        stock: 6,
        badge: 'الأفضل'
    },
    {
        id: 12,
        name: 'Gigabyte B760M AORUS Elite',
        slug: 'gigabyte-b760m-aorus',
        category: 'motherboards',
        subcategory: 'mb-intel',
        categoryName: 'اللوحات الأم',
        price: 280000,
        oldPrice: 330000,
        discount: 15,
        description: 'لوحة أم Micro-ATX من Gigabyte لمعالجات Intel. حجم صغير وأداء ممتاز.',
        features: [
            'سوكيت LGA 1700',
            'شيبست B760',
            'DDR5 حتى 6000MHz',
            'Micro-ATX',
            '2.5G LAN'
        ],
        images: [
            'https://microless.com/cdn/products/53daea3fd4d814aea5eb2a7e877c1a70-hi.jpg'
        ],
        rating: 4.5,
        reviews: 189,
        stock: 28,
        badge: null
    },

    // ==================== الرامات ====================
    {
        id: 13,
        name: 'G.Skill Trident Z5 RGB DDR5 32GB',
        slug: 'gskill-trident-z5-32gb',
        category: 'ram',
        subcategory: 'ram-desktop',
        categoryName: 'الرامات',
        price: 280000,
        oldPrice: 350000,
        discount: 20,
        description: 'رامات G.Skill Trident Z5 RGB بسرعة 6000MHz. 32GB (2x16GB) مع إضاءة RGB مذهلة.',
        features: [
            '32GB (2x16GB)',
            'DDR5-6000MHz',
            'CL30-40-40-96',
            'إضاءة RGB',
            'ضمان مدى الحياة'
        ],
        images: [
            'https://www.gskill.com/_upload/images/2110201626450.png'
        ],
        rating: 4.8,
        reviews: 145,
        stock: 40,
        badge: 'الأكثر مبيعاً'
    },
    {
        id: 14,
        name: 'Corsair Vengeance DDR5 64GB',
        slug: 'corsair-vengeance-ddr5-64gb',
        category: 'ram',
        subcategory: 'ram-desktop',
        categoryName: 'الرامات',
        price: 480000,
        oldPrice: 580000,
        discount: 17,
        description: 'رامات Corsair Vengeance DDR5 سعة 64GB للمحترفين والـ Content Creators.',
        features: [
            '64GB (2x32GB)',
            'DDR5-5600MHz',
            'CL36',
            'تصميم أنيق',
            'متوافقة مع XMP 3.0'
        ],
        images: [
            'https://www.gskill.com/_upload/images/2110201626450.png'
        ],
        rating: 4.7,
        reviews: 89,
        stock: 18,
        badge: null
    },
    {
        id: 15,
        name: 'Crucial DDR5 SODIMM 32GB للابتوب',
        slug: 'crucial-ddr5-sodimm-32gb',
        category: 'ram',
        subcategory: 'ram-laptop',
        categoryName: 'الرامات',
        price: 180000,
        oldPrice: 220000,
        discount: 18,
        description: 'رام Crucial DDR5 للابتوب. سعة 32GB مثالية لترقية اللابتوب.',
        features: [
            '32GB (16GBx2)',
            'DDR5-4800MHz SODIMM',
            'للابتوب',
            'ضمان مدى الحياة',
            'توافق واسع'
        ],
        images: [
            'https://www.gskill.com/_upload/images/2110201626450.png'
        ],
        rating: 4.6,
        reviews: 234,
        stock: 45,
        badge: null
    },

    // ==================== التخزين ====================
    {
        id: 16,
        name: 'Samsung 990 Pro 2TB NVMe M.2',
        slug: 'samsung-990-pro-2tb',
        category: 'storage',
        subcategory: 'storage-m2',
        categoryName: 'التخزين',
        price: 320000,
        oldPrice: 400000,
        discount: 20,
        description: 'أسرع SSD من Samsung! سرعة قراءة 7450MB/s وكتابة 6900MB/s. مثالي للـ PS5 والجيمنج.',
        features: [
            '2TB NVMe M.2',
            'قراءة: 7450 MB/s',
            'كتابة: 6900 MB/s',
            'PCIe 4.0 x4',
            'متوافق مع PS5'
        ],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaghu1pqZZVyATSByCmHrUPlLHe4uu7lvzDg&s'
        ],
        rating: 4.9,
        reviews: 312,
        stock: 35,
        badge: 'الأسرع'
    },
    {
        id: 17,
        name: 'WD Black SN850X 1TB',
        slug: 'wd-black-sn850x-1tb',
        category: 'storage',
        subcategory: 'storage-m2',
        categoryName: 'التخزين',
        price: 180000,
        oldPrice: 220000,
        discount: 18,
        description: 'SSD WD Black SN850X للجيمنج. أداء ثابت وموثوقية عالية.',
        features: [
            '1TB NVMe M.2',
            'قراءة: 7300 MB/s',
            'كتابة: 6300 MB/s',
            'PCIe 4.0',
            'ضمان 5 سنوات'
        ],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaghu1pqZZVyATSByCmHrUPlLHe4uu7lvzDg&s'
        ],
        rating: 4.8,
        reviews: 198,
        stock: 42,
        badge: null
    },
    {
        id: 18,
        name: 'Samsung 870 EVO 2TB SATA SSD',
        slug: 'samsung-870-evo-2tb',
        category: 'storage',
        subcategory: 'storage-ssd',
        categoryName: 'التخزين',
        price: 220000,
        oldPrice: 280000,
        discount: 21,
        description: 'SSD SATA موثوق من Samsung بسعة 2TB. مثالي لترقية الأنظمة القديمة.',
        features: [
            '2TB SATA SSD',
            'قراءة: 560 MB/s',
            'كتابة: 530 MB/s',
            '2.5 بوصة',
            'ضمان 5 سنوات'
        ],
        images: [
            'https://mogambonlinestore.com/cdn/shop/products/hard-samsung-evo-870-ssd-1tb-755714.png?v=1662772036'
        ],
        rating: 4.7,
        reviews: 456,
        stock: 55,
        badge: null
    },
    {
        id: 19,
        name: 'Seagate Barracuda 4TB HDD',
        slug: 'seagate-barracuda-4tb',
        category: 'storage',
        subcategory: 'storage-hdd',
        categoryName: 'التخزين',
        price: 140000,
        oldPrice: 170000,
        discount: 18,
        description: 'هارد Seagate Barracuda 4TB للتخزين الضخم. مثالي للملفات والألعاب.',
        features: [
            '4TB HDD',
            '5400 RPM',
            '256MB Cache',
            'SATA 6Gb/s',
            'ضمان سنتين'
        ],
        images: [
            'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600'
        ],
        rating: 4.4,
        reviews: 567,
        stock: 60,
        badge: 'سعة كبيرة'
    },

    // ==================== التبريد ====================
    {
        id: 20,
        name: 'NZXT Kraken X73 RGB',
        slug: 'nzxt-kraken-x73-rgb',
        category: 'cooling',
        subcategory: 'cooling-liquid',
        categoryName: 'التبريد',
        price: 380000,
        oldPrice: 450000,
        discount: 16,
        description: 'تبريد مائي AIO 360mm من NZXT. شاشة LCD مخصصة وأداء تبريد استثنائي.',
        features: [
            'راديتر 360mm',
            'شاشة LCD 2.36"',
            '3 مراوح 120mm',
            'إضاءة RGB',
            'متوافق مع AM5 و LGA 1700'
        ],
        images: [
            'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600'
        ],
        rating: 4.8,
        reviews: 123,
        stock: 15,
        badge: 'فاخر'
    },
    {
        id: 21,
        name: 'Noctua NH-D15',
        slug: 'noctua-nh-d15',
        category: 'cooling',
        subcategory: 'cooling-air',
        categoryName: 'التبريد',
        price: 180000,
        oldPrice: 210000,
        discount: 14,
        description: 'أفضل مبرد هوائي في العالم! Noctua NH-D15 بأداء ينافس التبريد المائي.',
        features: [
            'مبرد برجين',
            '2 مروحة NF-A15',
            'ارتفاع: 165mm',
            'هادئ جداً',
            'ضمان 6 سنوات'
        ],
        images: [
            'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600'
        ],
        rating: 4.9,
        reviews: 234,
        stock: 20,
        badge: 'الأفضل'
    },
    {
        id: 22,
        name: 'Arctic MX-6 Thermal Paste 4g',
        slug: 'arctic-mx6-thermal-paste',
        category: 'cooling',
        subcategory: 'cooling-paste',
        categoryName: 'التبريد',
        price: 15000,
        oldPrice: 20000,
        discount: 25,
        description: 'معجون حراري Arctic MX-6 عالي الأداء. سهل التطبيق وطويل الأمد.',
        features: [
            '4 غرام',
            'أداء حراري ممتاز',
            'غير موصل للكهرباء',
            'سهل التطبيق',
            '8 سنوات عمر افتراضي'
        ],
        images: [
            'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600'
        ],
        rating: 4.7,
        reviews: 567,
        stock: 100,
        badge: null
    },
    {
        id: 23,
        name: 'Corsair iCUE SP120 RGB Elite 3-Pack',
        slug: 'corsair-sp120-rgb-3pack',
        category: 'cooling',
        subcategory: 'cooling-fans',
        categoryName: 'التبريد',
        price: 95000,
        oldPrice: 120000,
        discount: 21,
        description: 'طقم 3 مراوح RGB من Corsair مع كنترولر. إضاءة مذهلة وأداء هادئ.',
        features: [
            '3 مراوح 120mm',
            'إضاءة RGB',
            'PWM Control',
            'كنترولر مضمن',
            'iCUE متوافق'
        ],
        images: [
            'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600'
        ],
        rating: 4.6,
        reviews: 345,
        stock: 35,
        badge: null
    },

    // ==================== مزودات الطاقة ====================
    {
        id: 24,
        name: 'Corsair RM1000x 1000W',
        slug: 'corsair-rm1000x',
        category: 'psu',
        subcategory: null,
        categoryName: 'مزودات الطاقة',
        price: 280000,
        oldPrice: 340000,
        discount: 18,
        description: 'باور سبلاي Corsair RM1000x بقدرة 1000W. شهادة 80+ Gold وكيبلات Modular.',
        features: [
            '1000W',
            '80+ Gold',
            'Full Modular',
            'مروحة هادئة',
            'ضمان 10 سنوات'
        ],
        images: [
            'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600'
        ],
        rating: 4.9,
        reviews: 178,
        stock: 18,
        badge: 'الأفضل'
    },
    {
        id: 25,
        name: 'EVGA SuperNOVA 850 G6',
        slug: 'evga-supernova-850-g6',
        category: 'psu',
        subcategory: null,
        categoryName: 'مزودات الطاقة',
        price: 180000,
        oldPrice: 220000,
        discount: 18,
        description: 'باور سبلاي EVGA 850W ذهبي. أداء موثوق للبلدات المتوسطة والعالية.',
        features: [
            '850W',
            '80+ Gold',
            'Full Modular',
            'حجم صغير',
            'ضمان 10 سنوات'
        ],
        images: [
            'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600'
        ],
        rating: 4.7,
        reviews: 234,
        stock: 25,
        badge: null
    },

    // ==================== كيسات الكمبيوتر ====================
    {
        id: 26,
        name: 'Lian Li O11 Dynamic EVO',
        slug: 'lian-li-o11-dynamic-evo',
        category: 'cases',
        subcategory: null,
        categoryName: 'كيسات الكمبيوتر',
        price: 280000,
        oldPrice: 340000,
        discount: 18,
        description: 'كيس Lian Li O11 Dynamic EVO الأسطوري. تصميم مفتوح مع زجاج من 3 جهات.',
        features: [
            'Mid-Tower',
            'زجاج مقسى',
            'دعم 360mm راديتر',
            'ATX / E-ATX',
            'تصميم أيقوني'
        ],
        images: [
            'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600'
        ],
        rating: 4.9,
        reviews: 345,
        stock: 12,
        badge: 'الأكثر مبيعاً'
    },
    {
        id: 27,
        name: 'NZXT H510 Flow',
        slug: 'nzxt-h510-flow',
        category: 'cases',
        subcategory: null,
        categoryName: 'كيسات الكمبيوتر',
        price: 150000,
        oldPrice: 180000,
        discount: 17,
        description: 'كيس NZXT H510 Flow بتصميم عصري وتهوية محسّنة.',
        features: [
            'Mid-Tower',
            'واجهة شبكية',
            'ATX',
            'تنظيم كيبلات ممتاز',
            'زجاج جانبي'
        ],
        images: [
            'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600'
        ],
        rating: 4.6,
        reviews: 289,
        stock: 20,
        badge: null
    },

    // ==================== الإكسسوارات ====================
    {
        id: 28,
        name: 'Logitech G Pro X Wireless',
        slug: 'logitech-gpro-x-wireless',
        category: 'accessories',
        subcategory: 'acc-headsets',
        categoryName: 'الإكسسوارات',
        price: 280000,
        oldPrice: 340000,
        discount: 18,
        description: 'سماعة Logitech G Pro X اللاسلكية للمحترفين. صوت احترافي ومايك Blue VO!CE.',
        features: [
            'لاسلكية',
            'DTS Headphone:X 2.0',
            'Blue VO!CE Mic',
            'بطارية 20 ساعة',
            'درايفرات 50mm'
        ],
        images: [
            'https://images.unsplash.com/photo-1599669454699-248893623440?w=600'
        ],
        rating: 4.8,
        reviews: 234,
        stock: 18,
        badge: 'احترافي'
    },
    {
        id: 29,
        name: 'HyperX Cloud II Wireless',
        slug: 'hyperx-cloud-ii-wireless',
        category: 'accessories',
        subcategory: 'acc-headsets',
        categoryName: 'الإكسسوارات',
        price: 180000,
        oldPrice: 220000,
        discount: 18,
        description: 'سماعة HyperX Cloud II اللاسلكية. راحة فائقة وصوت 7.1 Surround.',
        features: [
            'لاسلكية',
            '7.1 Surround',
            'ذاكرة فوم',
            'بطارية 30 ساعة',
            'خفيفة الوزن'
        ],
        images: [
            'https://images.unsplash.com/photo-1599669454699-248893623440?w=600'
        ],
        rating: 4.7,
        reviews: 456,
        stock: 30,
        badge: 'الأكثر مبيعاً'
    },
    {
        id: 30,
        name: 'Razer Huntsman V2',
        slug: 'razer-huntsman-v2',
        category: 'accessories',
        subcategory: 'acc-keyboards',
        categoryName: 'الإكسسوارات',
        price: 320000,
        oldPrice: 380000,
        discount: 16,
        description: 'كيبورد Razer Huntsman V2 مع سويتشات Optical. أسرع استجابة في العالم.',
        features: [
            'سويتشات Optical',
            'RGB Chroma',
            'مسند معصم',
            'PBT Keycaps',
            'مقاوم للماء'
        ],
        images: [
            'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600'
        ],
        rating: 4.8,
        reviews: 167,
        stock: 15,
        badge: 'فاخر'
    },
    {
        id: 31,
        name: 'Logitech G502 X Plus',
        slug: 'logitech-g502-x-plus',
        category: 'accessories',
        subcategory: 'acc-mice',
        categoryName: 'الإكسسوارات',
        price: 220000,
        oldPrice: 280000,
        discount: 21,
        description: 'ماوس Logitech G502 X Plus اللاسلكي. تصميم أيقوني مع تقنية LIGHTFORCE.',
        features: [
            'لاسلكي LIGHTSPEED',
            'سنسور HERO 25K',
            '13 زر قابل للبرمجة',
            'إضاءة RGB',
            'بطارية 130 ساعة'
        ],
        images: [
            'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600'
        ],
        rating: 4.8,
        reviews: 289,
        stock: 22,
        badge: 'الأفضل'
    },
    {
        id: 32,
        name: 'Razer DeathAdder V3 Pro',
        slug: 'razer-deathadder-v3-pro',
        category: 'accessories',
        subcategory: 'acc-mice',
        categoryName: 'الإكسسوارات',
        price: 250000,
        oldPrice: 300000,
        discount: 17,
        description: 'ماوس Razer DeathAdder V3 Pro خفيف الوزن. مثالي للـ eSports.',
        features: [
            'وزن 63 غرام',
            'Focus Pro 30K',
            'HyperSpeed Wireless',
            'Grip Tape مضمن',
            'بطارية 90 ساعة'
        ],
        images: [
            'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600'
        ],
        rating: 4.9,
        reviews: 198,
        stock: 18,
        badge: 'eSports'
    },
    {
        id: 33,
        name: 'SteelSeries QcK Heavy XXL',
        slug: 'steelseries-qck-xxl',
        category: 'accessories',
        subcategory: 'acc-mousepads',
        categoryName: 'الإكسسوارات',
        price: 55000,
        oldPrice: 70000,
        discount: 21,
        description: 'ماوس باد SteelSeries QcK Heavy بحجم XXL. سطح قماشي ناعم وقاعدة مطاطية.',
        features: [
            'حجم XXL: 900x400mm',
            'سماكة 4mm',
            'قماش ناعم',
            'قاعدة مطاطية',
            'مقاوم للماء'
        ],
        images: [
            'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600'
        ],
        rating: 4.6,
        reviews: 456,
        stock: 45,
        badge: null
    },
    {
        id: 34,
        name: 'Corsair MM700 RGB',
        slug: 'corsair-mm700-rgb',
        category: 'accessories',
        subcategory: 'acc-mousepads',
        categoryName: 'الإكسسوارات',
        price: 95000,
        oldPrice: 120000,
        discount: 21,
        description: 'ماوس باد Corsair MM700 مع إضاءة RGB. حجم كبير وسطح قماشي احترافي.',
        features: [
            'حجم Extended: 930x400mm',
            'إضاءة RGB 360°',
            'شحن USB مدمج',
            'سطح قماشي',
            'iCUE متوافق'
        ],
        images: [
            'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600'
        ],
        rating: 4.7,
        reviews: 234,
        stock: 28,
        badge: 'RGB'
    }
];

// المحافظات العراقية
const provinces = [
    'بغداد',
    'البصرة',
    'نينوى',
    'أربيل',
    'النجف',
    'كربلاء',
    'الأنبار',
    'ذي قار',
    'ديالى',
    'كركوك',
    'صلاح الدين',
    'بابل',
    'واسط',
    'ميسان',
    'المثنى',
    'القادسية',
    'دهوك',
    'السليمانية'
];

/**
 * الحصول على منتج بواسطة المعرف
 * @param {number} id - معرف المنتج
 * @returns {object|undefined} - المنتج أو undefined
 */
function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

/**
 * الحصول على منتجات حسب التصنيف الرئيسي
 * @param {string} category - slug التصنيف
 * @returns {array} - قائمة المنتجات
 */
function getProductsByCategory(category) {
    if (!category || category === 'all') return products;
    return products.filter(p => p.category === category);
}

/**
 * الحصول على منتجات حسب التصنيف الفرعي
 * @param {string} subcategory - slug التصنيف الفرعي
 * @returns {array} - قائمة المنتجات
 */
function getProductsBySubcategory(subcategory) {
    if (!subcategory) return products;
    return products.filter(p => p.subcategory === subcategory);
}

/**
 * الحصول على التصنيف الرئيسي بواسطة slug
 * @param {string} slug - slug التصنيف
 * @returns {object|undefined} - التصنيف
 */
function getCategoryBySlug(slug) {
    return categories.find(c => c.slug === slug);
}

/**
 * الحصول على التصنيف الفرعي
 * @param {string} subcategorySlug - slug التصنيف الفرعي
 * @returns {object|undefined} - التصنيف الفرعي
 */
function getSubcategoryBySlug(subcategorySlug) {
    for (const cat of categories) {
        if (cat.subcategories) {
            const sub = cat.subcategories.find(s => s.slug === subcategorySlug);
            if (sub) return { ...sub, parentCategory: cat };
        }
    }
    return undefined;
}

/**
 * البحث في المنتجات
 * @param {string} query - نص البحث
 * @returns {array} - نتائج البحث
 */
function searchProducts(query) {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return products;

    return products.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.categoryName.includes(searchTerm)
    );
}

/**
 * فلترة المنتجات حسب السعر
 * @param {number} minPrice - أقل سعر
 * @param {number} maxPrice - أعلى سعر
 * @param {array} productsList - قائمة المنتجات (اختياري)
 * @returns {array} - المنتجات المفلترة
 */
function filterByPrice(minPrice, maxPrice, productsList = products) {
    return productsList.filter(p => p.price >= minPrice && p.price <= maxPrice);
}

/**
 * ترتيب المنتجات
 * @param {array} productsList - قائمة المنتجات
 * @param {string} sortBy - معيار الترتيب
 * @returns {array} - المنتجات المرتبة
 */
function sortProducts(productsList, sortBy) {
    const sorted = [...productsList];

    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted.sort((a, b) => b.id - a.id);
        default:
            return sorted;
    }
}

/**
 * تنسيق السعر
 * @param {number} price - السعر
 * @returns {string} - السعر منسق
 */
function formatPrice(price) {
    return price.toLocaleString('ar-IQ') + ' د.ع';
}

/**
 * الحصول على المنتجات المميزة
 * @param {number} limit - عدد المنتجات
 * @returns {array} - المنتجات المميزة
 */
function getFeaturedProducts(limit = 8) {
    return products.filter(p => p.badge).slice(0, limit);
}

/**
 * الحصول على أحدث المنتجات
 * @param {number} limit - عدد المنتجات
 * @returns {array} - أحدث المنتجات
 */
function getLatestProducts(limit = 8) {
    return [...products].sort((a, b) => b.id - a.id).slice(0, limit);
}
