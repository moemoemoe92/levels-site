/* ====================================
   Menu Management
   إدارة القائمة
   ==================================== */

// Menu Data Structure - بيانات القائمة
const menuData = {
    coffee: [
        {
            name: 'إسبريسو',
            nameEn: 'Espresso',
            calories: 5,
            hotPrice: 12,
            coldPrice: 'N/A',
            description: 'قهوة إيطالية مركزة ومكثفة',
            popular: true
        },
        {
            name: 'أمريكانو',
            nameEn: 'Americano',
            calories: 10,
            hotPrice: 14,
            coldPrice: 15,
            description: 'إسبريسو مخفف بالماء الساخن',
            popular: true
        },
        {
            name: 'كابتشينو',
            nameEn: 'Cappuccino',
            calories: 80,
            hotPrice: 16,
            coldPrice: 'N/A',
            description: 'إسبريسو مع حليب مرغي'
        },
        {
            name: 'فلات وايت',
            nameEn: 'Flat White',
            calories: 100,
            hotPrice: 17,
            coldPrice: 'N/A',
            description: 'قهوة أسترالية بالحليب الحريري'
        },
        {
            name: 'لاتيه',
            nameEn: 'Latte',
            calories: 120,
            hotPrice: 18,
            coldPrice: 19,
            description: 'قهوة بالحليب الكريمي',
            popular: true
        },
        {
            name: 'لاتيه إسباني',
            nameEn: 'Spanish Latte',
            calories: 160,
            hotPrice: 18,
            coldPrice: 19,
            description: 'لاتيه بالحليب المكثف'
        },
        {
            name: 'لاتيه كراميل ملحي',
            nameEn: 'Salted Caramel Latte',
            calories: 190,
            hotPrice: 19,
            coldPrice: 20,
            description: 'لاتيه بالكراميل والملح',
            popular: true
        },
        {
            name: 'لاتيه فانيليا',
            nameEn: 'Vanilla Latte',
            calories: 180,
            hotPrice: 19,
            coldPrice: 20,
            description: 'لاتيه بنكهة الفانيليا'
        },
        {
            name: 'موكا',
            nameEn: 'Mocha',
            calories: 230,
            hotPrice: 19,
            coldPrice: 20,
            description: 'قهوة بالشوكولاتة والحليب'
        },
        {
            name: 'موكا وايت',
            nameEn: 'White Mocha',
            calories: 250,
            hotPrice: 19,
            coldPrice: 20,
            description: 'موكا بالشوكولاتة البيضاء'
        },
        {
            name: 'ماتشا',
            nameEn: 'Matcha',
            calories: 150,
            hotPrice: 23,
            coldPrice: 24,
            description: 'شاي أخضر ياباني فاخر'
        },
        {
            name: 'لاتيه ليفيلز (توقيع)',
            nameEn: 'Levels Signature Latte',
            calories: 200,
            hotPrice: 24,
            coldPrice: 25,
            description: 'تركيبة خاصة من ليفيلز',
            signature: true
        },
        {
            name: 'لاتيه شوكو',
            nameEn: 'Choco Latte',
            calories: 220,
            hotPrice: 22,
            coldPrice: 22,
            description: 'لاتيه بالشوكولاتة الفاخرة'
        }
    ],
    tea: [
        {
            name: 'شاي أحمر',
            nameEn: 'Black Tea',
            calories: 0,
            hotPrice: 5,
            coldPrice: 'N/A',
            description: 'شاي تقليدي'
        },
        {
            name: 'شاي أخضر',
            nameEn: 'Green Tea',
            calories: 0,
            hotPrice: 5,
            coldPrice: 'N/A',
            description: 'شاي صحي ومنعش'
        },
        {
            name: 'شاي أخضر بالنعناع',
            nameEn: 'Mint Green Tea',
            calories: 5,
            hotPrice: 5,
            coldPrice: 'N/A',
            description: 'شاي أخضر بنكهة النعناع'
        },
        {
            name: 'كاموميل',
            nameEn: 'Chamomile',
            calories: 0,
            hotPrice: 7,
            coldPrice: 'N/A',
            description: 'شاي البابونج المهدئ'
        },
        {
            name: 'هيبيسكوس',
            nameEn: 'Hibiscus',
            calories: 40,
            hotPrice: 'N/A',
            coldPrice: 18,
            description: 'شاي الكركديه البارد'
        }
    ],
    special: [
        {
            name: 'V60 (كولومبيا/إثيوبيا/كوستاريكا)',
            nameEn: 'V60 Pour Over',
            calories: 5,
            hotPrice: 19,
            coldPrice: 19,
            description: 'قهوة مختصة محضرة يدوياً',
            signature: true
        },
        {
            name: 'موهيتو – جميع النكهات',
            nameEn: 'Mojito - All Flavors',
            calories: 120,
            hotPrice: 'N/A',
            coldPrice: 18,
            description: 'مشروب منعش بنكهات متنوعة'
        },
        {
            name: 'ليمون برازيلي',
            nameEn: 'Brazilian Lemonade',
            calories: 90,
            hotPrice: 'N/A',
            coldPrice: 22,
            description: 'ليموناضة كريمية برازيلية',
            popular: true
        },
        {
            name: 'ريد بول',
            nameEn: 'Red Bull',
            calories: 110,
            hotPrice: 'N/A',
            coldPrice: 14,
            description: 'مشروب طاقة'
        },
        {
            name: 'كود ريد',
            nameEn: 'Code Red',
            calories: 90,
            hotPrice: 'N/A',
            coldPrice: 7,
            description: 'مشروب غازي'
        },
        {
            name: 'ماء غازي',
            nameEn: 'Sparkling Water',
            calories: 0,
            hotPrice: 'N/A',
            coldPrice: 7,
            description: 'ماء معدني فوار'
        },
        {
            name: 'ماء عادي',
            nameEn: 'Still Water',
            calories: 0,
            hotPrice: 'N/A',
            coldPrice: 5,
            description: 'ماء طبيعي'
        }
    ]
};

// Breakfast Data - بيانات الإفطار
const breakfastData = [
    {
        name: 'إفطار إنجليزي',
        nameEn: 'English Breakfast',
        price: 45,
        calories: 650,
        image: 'https://images.unsplash.com/photo-1533920379810-6bedac961c2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        description: 'إفطار تقليدي شامل',
        ingredients: ['بيض', 'نقانق', 'فاصولياء', 'خبز محمص']
    },
    {
        name: 'إيجز بينيديكت',
        nameEn: 'Eggs Benedict',
        price: 38,
        calories: 450,
        image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        description: 'بيض مسلوق مع صلصة الهولانديز',
        ingredients: ['بيض', 'خبز إنجليزي', 'صلصة هولانديز'],
        popular: true
    },
    {
        name: 'توست أفوكادو',
        nameEn: 'Avocado Toast',
        price: 32,
        calories: 350,
        image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        description: 'خبز محمص بالأفوكادو الطازج',
        ingredients: ['أفوكادو', 'خبز', 'بيض', 'طماطم'],
        popular: true
    }
];

// Menu Manager Class - فئة إدارة القائمة
class MenuManager {
    constructor() {
        this.currentCategory = 'coffee';
        this.menuTable = document.getElementById('menu-body');
        this.categoryButtons = document.querySelectorAll('.category-btn');
        this.modal = document.getElementById('item-modal');
        this.init();
    }

    init() {
        this.displayMenuItems(this.currentCategory);
        this.attachCategoryListeners();
        this.displayBreakfastItems();
    }

    // Display menu items - عرض عناصر القائمة
    displayMenuItems(category) {
        if (!this.menuTable) return;

        const items = menuData[category];
        this.menuTable.innerHTML = '';

        items.forEach((item, index) => {
            const row = document.createElement('tr');
            row.setAttribute('data-aos', 'fade-up');
            row.setAttribute('data-aos-delay', (index * 50).toString());

            // Add badges for special items
            let nameBadges = '';
            if (item.signature) {
                nameBadges = ' <span style="background: var(--color-accent); color: white; padding: 2px 8px; border-radius: 3px; font-size: 0.7em; margin-right: 5px;">توقيع</span>';
            }
            if (item.popular) {
                nameBadges += ' <span style="background: #e74c3c; color: white; padding: 2px 8px; border-radius: 3px; font-size: 0.7em;">مشهور</span>';
            }

            row.innerHTML = `
                <td>${item.name}${nameBadges}</td>
                <td>${item.calories}</td>
                <td>${item.hotPrice !== 'N/A' ? item.hotPrice : '-'}</td>
                <td>${item.coldPrice !== 'N/A' ? item.coldPrice : '-'}</td>
            `;

            row.style.cursor = 'pointer';
            row.addEventListener('click', () => this.showItemModal(item, category));

            this.menuTable.appendChild(row);
        });

        // Reinitialize AOS for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    // Show item modal - عرض نافذة العنصر
    showItemModal(item, category) {
        const placeholderImage = `https://source.unsplash.com/featured/?${encodeURIComponent(item.nameEn || item.name)},drink,coffee`;

        let priceText = '';
        if (item.hotPrice !== 'N/A' && item.coldPrice !== 'N/A') {
            priceText = `ساخن: ${item.hotPrice} ريال | بارد: ${item.coldPrice} ريال`;
        } else if (item.hotPrice !== 'N/A') {
            priceText = `ساخن: ${item.hotPrice} ريال`;
        } else {
            priceText = `بارد: ${item.coldPrice} ريال`;
        }

        document.getElementById('modal-name').textContent = item.name;
        document.getElementById('modal-calories').textContent = `السعرات: ${item.calories} سعرة حرارية`;
        document.getElementById('modal-price').textContent = `السعر: ${priceText}`;
        document.getElementById('modal-image').src = placeholderImage;

        // Add description if available
        if (item.description) {
            const descElement = document.getElementById('modal-description');
            if (descElement) {
                descElement.textContent = item.description;
            }
        }

        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Attach category button listeners - إرفاق مستمعي أزرار الفئات
    attachCategoryListeners() {
        this.categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.categoryButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.displayMenuItems(this.currentCategory);
            });
        });
    }

    // Display breakfast items - عرض عناصر الإفطار
    displayBreakfastItems() {
        const breakfastGrid = document.getElementById('breakfast-grid');
        if (!breakfastGrid) return;

        breakfastData.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'gaming-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index * 200).toString());

            let badges = '';
            if (item.popular) {
                badges = '<span style="position: absolute; top: 10px; right: 10px; background: #e74c3c; color: white; padding: 5px 10px; border-radius: 5px; font-size: 0.8em; z-index: 10;">مشهور</span>';
            }

            card.innerHTML = `
                ${badges}
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="gaming-overlay">
                    <h3>${item.name}</h3>
                    <p>${item.description || ''}</p>
                    <p style="font-weight: bold; color: var(--color-accent-light);">السعر: ${item.price} ريال</p>
                </div>
            `;

            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                document.getElementById('modal-name').textContent = item.name;
                document.getElementById('modal-calories').textContent = item.calories ? `السعرات: ${item.calories} سعرة حرارية` : '';
                document.getElementById('modal-price').textContent = `السعر: ${item.price} ريال`;
                document.getElementById('modal-image').src = item.image;

                if (item.description) {
                    const descElement = document.getElementById('modal-description');
                    if (descElement) {
                        descElement.textContent = item.description;
                    }
                }

                this.modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });

            breakfastGrid.appendChild(card);
        });
    }

    // Close modal - إغلاق النافذة
    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize menu manager on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const menuManager = new MenuManager();

    // Close modal when clicking outside or on close button
    const modal = document.getElementById('item-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                menuManager.closeModal();
            }
        });

        const closeBtn = modal.querySelector('button');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => menuManager.closeModal());
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            menuManager.closeModal();
        }
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MenuManager, menuData, breakfastData };
}
