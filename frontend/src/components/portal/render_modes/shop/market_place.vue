<template>
    <div class="bg-gray-100 min-h-screen mt-24">
        <div class="container mx-auto px-4 py-8">
            <!-- Shopping Limit Input -->
            <div v-if="!shoppingLimitSet" class="mb-8">
                <h2 class="text-2xl font-bold mb-4">Set Your Shopping Limit</h2>
                <div class="flex items-center">
                    <input v-model="shoppingLimit" type="number" min="0" step="100"
                        class="w-64 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary mr-4">
                    <button @click="setShoppingLimit"
                        class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                        Set Limit
                    </button>
                </div>
            </div>

            <!-- Toggle Sidebar Button -->
            <button @click="toggleSidebar" class="mb-4 px-4 py-2 bg-primary text-white rounded-lg">
                {{ showSidebar ? 'Hide Filters' : 'Show Filters' }}
            </button>

            <div class="flex">
                <!-- Sidebar -->
                <transition name="slide">
                    <aside v-if="showSidebar" class="w-64 bg-white p-4 rounded-lg shadow-lg mr-8">
                        <h2 class="text-xl font-bold mb-4">Filters</h2>

                        <!-- Materials Filter -->
                        <div class="mb-4">
                            <h3 class="font-semibold mb-2">Materials</h3>
                            <div v-for="material in uniqueMaterials" :key="material">
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="selectedMaterials" :value="material" class="mr-2">
                                    {{ material }}
                                </label>
                            </div>
                        </div>

                        <!-- Size Filter -->
                        <div class="mb-4">
                            <h3 class="font-semibold mb-2">Size</h3>
                            <div v-for="size in uniqueSizes" :key="size">
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="selectedSizes" :value="size" class="mr-2">
                                    {{ size }}
                                </label>
                            </div>
                        </div>

                        <!-- Color Filter -->
                        <div class="mb-4">
                            <h3 class="font-semibold mb-2">Color</h3>
                            <div class="grid grid-cols-4 gap-2">
                                <div v-for="color in uniqueColors" :key="color" :style="{ backgroundColor: color }"
                                    class="w-6 h-6 rounded-full cursor-pointer" @click="toggleColor(color)">
                                </div>
                            </div>
                        </div>

                        <!-- Apply Filters Button -->
                        <button @click="applyFilters" class="w-full px-4 py-2 bg-primary text-white rounded-lg">
                            Apply Filters
                        </button>
                    </aside>
                </transition>

                <div class="flex-1">
                    <!-- Search Bar -->
                    <div class="mb-8 relative">
                        <input v-model="searchQuery" @input="handleSearch" @focus="showSearchOverlay = true" type="text"
                            placeholder="Search products..."
                            class="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-primary">

                        <!-- Search Overlay -->
                        <transition name="fade">
                            <div v-if="showSearchOverlay"
                                class="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-2 p-4 z-10">
                                <button @click="closeSearchOverlay"
                                    class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                                    <i class="fas fa-times"></i>
                                </button>
                                <h3 class="font-semibold mb-2">Categories</h3>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    <button v-for="category in categories" :key="category.id"
                                        @click="selectCategory(category)"
                                        class="px-3 py-1 bg-gray-200 rounded-full text-sm">
                                        {{ category.name }}
                                    </button>
                                </div>
                                <h3 class="font-semibold mb-2">Materials</h3>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    <button v-for="material in uniqueMaterials" :key="material"
                                        @click="addMaterialToSearch(material)"
                                        class="px-3 py-1 bg-gray-200 rounded-full text-sm">
                                        {{ material }}
                                    </button>
                                </div>
                                <h3 class="font-semibold mb-2">Tags</h3>
                                <div class="flex flex-wrap gap-2">
                                    <button v-for="tag in uniqueTags" :key="tag" @click="addTagToSearch(tag)"
                                        class="px-3 py-1 bg-gray-200 rounded-full text-sm">
                                        {{ tag }}
                                    </button>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <!-- Product Categories -->
                    <div v-if="!isSearching" class="flex flex-wrap justify-center gap-4 mb-12">
                        <button @click="selectCategory(null)" :class="['px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300',
                            !selectedCategory ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-blue-100']">
                            All Categories
                        </button>
                        <button v-for="category in categories" :key="category.id" @click="selectCategory(category)"
                            :class="['px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300',
                                selectedCategory === category ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-blue-100']">
                            <i :class="getCategoryIcon(category.name)" class="mr-2"></i>
                            {{ category.name }}
                        </button>
                    </div>

                    <!-- Sorting Options -->
                    <div v-if="!isSearching" class="mb-8 flex justify-end">
                        <select v-model="sortOption" @change="handleSort"
                            class="px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary">
                            <option value="default">Default Sorting</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="name_asc">Name: A to Z</option>
                            <option value="name_desc">Name: Z to A</option>
                            <option value="ranking">Ranking</option>
                        </select>
                    </div>

                    <!-- Product Items -->
                    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
                        <div v-for="item in paginatedProducts" :key="item.id"
                            class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-3">
                            <div class="relative overflow-hidden group" @click="openProductModal(item)">
                                <Carousel :items-to-show="1" :autoplay="3000" :wrap-around="true">
                                    <slide v-for="(image, index) in item.images" :key="index">
                                        <img :src="image"
                                            class="w-full h-64 object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105"
                                            :alt="item.name">
                                    </slide>
                                    <template #addons>
                                        <Navigation />
                                        <Pagination />
                                    </template>
                                </Carousel>
                                <div
                                    class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span class="text-white text-lg font-semibold">View Details</span>
                                </div>
                            </div>
                            <div class="p-6">
                                <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ item.name }}</h2>
                                <p class="text-gray-600 mb-5 line-clamp-2" v-html="item.description"></p>
                                <div class="flex flex-col  justify-between items-center">
                                    <div class="flex items-center">
                                        <span v-if="item.discount_percentage > 0"
                                            class="text-red-500 line-through mr-3">
                                            MK{{ item.price.toLocaleString() }}
                                        </span>
                                        <span class="text-2xl font-bold"
                                            :class="{ 'text-green-600': item.discount_percentage > 0, 'text-primary': !item.discount_percentage }">
                                            MK{{ item.price.toLocaleString() }}
                                        </span>
                                    </div>
                                    <button @click="addToCart(item)"
                                        class="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-300">
                                        <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Pagination -->
                    <div class="mt-8 flex justify-center">
                        <button v-for="page in totalPages" :key="page" @click="nextPage(page)"
                            :class="['mx-1 px-4 py-2 rounded-full',
                                currentPage === page ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-blue-100']">
                            {{ page }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Cart Button -->
            <button @click="showCart = true"
                class="fixed bottom-8 right-8 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-300">
                <i class="fas fa-shopping-cart text-2xl"></i>
                <span
                    class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {{ cartItemCount }}
                </span>
            </button>

            <!-- Cart Modal -->
            <transition name="fade">
                <div v-if="showCart" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out"
                        :class="{ 'scale-100 opacity-100': showCart, 'scale-95 opacity-0': !showCart }">
                        <h2 class="text-3xl font-bold text-gray-800 mb-6">Your Cart</h2>
                        <div v-if="cart.length === 0" class="text-center text-gray-600">
                            Your cart is empty.
                        </div>
                        <div v-else>
                            <div v-for="(item, index) in cart" :key="item.id"
                                class="flex items-center justify-between mb-4">
                                <div class="flex items-center">
                                    <img :src="item.images[0]" alt="" class="w-16 h-16 object-cover rounded mr-4">
                                    <div>
                                        <h3 class="text-lg font-semibold">{{ item.name }}</h3>
                                        <p class="text-gray-600">MK{{ item.price.toLocaleString() }} x {{ item.quantity
                                            }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <button @click="decreaseQuantity(item)"
                                        class="text-gray-500 hover:text-gray-700 mr-2">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <span class="mx-2">{{ item.quantity }}</span>
                                    <button @click="increaseQuantity(item)"
                                        class="text-gray-500 hover:text-gray-700 ml-2">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                    <button @click="removeFromCart(index)" class="text-red-500 hover:text-red-700 ml-4">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="mt-6 border-t pt-4">
                                <div class="flex justify-between items-center mb-4">
                                    <span class="text-lg font-semibold">Total:</span>
                                    <span class="text-2xl font-bold text-primary">MK{{ cartTotal.toLocaleString()
                                        }}</span>
                                </div>
                                <button @click="proceedToCheckout"
                                    class="w-full px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-300">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                        <button @click="showCart = false"
                            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                </div>
            </transition>

            <!-- Checkout Modal -->
            <transition name="fade">
                <div v-if="showCheckout"
                    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white rounded-lg p-8 max-w-2xl w-full transform transition-all duration-300 ease-out"
                        :class="{ 'scale-100 opacity-100': showCheckout, 'scale-95 opacity-0': !showCheckout }">
                        <h2 class="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>
                        <form @submit.prevent="placeOrder">
                            <div class="mb-4">
                                <label for="name" class="block text-gray-700 font-semibold mb-2">Name</label>
                                <input v-model="customerName" type="text" id="name" required
                                    class="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary">
                            </div>
                            <div class="mb-4">
                                <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
                                <input v-model="customerEmail" type="email" id="email" required
                                    class="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary">
                            </div>
                            <div class="mb-4">
                                <label for="address" class="block text-gray-700 font-semibold mb-2">Address</label>
                                <textarea v-model="customerAddress" id="address" required
                                    class="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary"></textarea>
                            </div>
                            <div class="mb-6">
                                <h3 class="text-xl font-semibold mb-2">Order Summary</h3>
                                <div v-for="item in cart" :key="item.id" class="flex justify-between mb-2">
                                    <span>{{ item.name }} x {{ item.quantity }}</span>
                                    <span>MK{{ (item.price * item.quantity).toLocaleString() }}</span>
                                </div>
                                <div class="border-t pt-2 mt-2">
                                    <div class="flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span>MK{{ cartTotal.toLocaleString() }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <button type="button" @click="cancelOrder"
                                    class="px-6 py-3 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-300">
                                    Cancel Order
                                </button>
                                <button type="submit"
                                    class="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-300">
                                    Place Order
                                </button>
                            </div>
                        </form>
                        <button @click="downloadInvoice"
                            class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300">
                            Download Invoice
                        </button>
                    </div>
                </div>
            </transition>

            <!-- Product Details Modal -->
            <transition name="fade">
                <div v-if="showProductModal"
                    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out"
                        :class="{ 'scale-100 opacity-100': showProductModal, 'scale-95 opacity-0': !showProductModal }">
                        <div class="flex justify-between items-start mb-6">
                            <h2 class="text-3xl font-bold text-gray-800">{{ selectedProduct.name }}</h2>
                            <button @click="closeProductModal" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times text-2xl"></i>
                            </button>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <Carousel :items-to-show="1" :autoplay="3000" :wrap-around="true">
                                    <slide v-for="(image, index) in selectedProduct.images" :key="index">
                                        <img :src="image" :alt="selectedProduct.name" class="w-full h-auto rounded-lg">
                                    </slide>
                                    <template #addons>
                                        <Navigation />
                                        <Pagination />
                                    </template>
                                </Carousel>
                            </div>
                            <div>
                                <p class="text-gray-600 mb-4" v-html="selectedProduct.description"></p>
                                <div class="flex items-center mb-4">
                                    <span v-if="selectedProduct.discount_percentage > 0"
                                        class="text-red-500 line-through mr-2">MK{{
                                            selectedProduct.price.toLocaleString() }}</span>
                                    <span class="text-3xl font-bold"
                                        :class="{ 'text-green-600': selectedProduct.discount_percentage > 0, 'text-primary': !selectedProduct.discount_percentage }">
                                        MK{{ selectedProduct.price.toLocaleString() }}
                                    </span>
                                </div>
                                <div class="mb-4">
                                    <p><strong>Brand:</strong> {{ selectedProduct.brand }}</p>
                                    <p><strong>Materials:</strong> {{ selectedProduct.materials_used }}</p>
                                    <p><strong>Color:</strong> {{ selectedProduct.color }}</p>
                                    <p><strong>Size:</strong> {{ Array.isArray(selectedProduct.size) ?
                                        selectedProduct.size.join(', ') : selectedProduct.size }}</p>
                                    <p><strong>Features:</strong> {{ selectedProduct.features.join(', ') }}</p>
                                    <p><strong>Rating:</strong> {{ selectedProduct.rating }} ({{
                                        selectedProduct.number_of_reviews }} reviews)</p>
                                    <p><strong>In Stock:</strong> {{ selectedProduct.stock_status ? 'Yes' : 'No' }}</p>
                                </div>
                                <div class="mb-4">
                                    <label for="quantity"
                                        class="block text-gray-700 font-semibold mb-2">Quantity</label>
                                    <input v-model.number="selectedQuantity" type="number" id="quantity" min="1"
                                        class="w-24 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary">
                                </div>
                                <button @click="addToCartFromModal"
                                    class="w-full px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-300">
                                    <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                                </button>
                            </div>
                        </div>

                        <!-- Recommended Products -->
                        <div class="mt-8">
                            <h3 class="text-2xl font-bold mb-4">Recommended Products</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div v-for="product in recommendedProducts" :key="product.id"
                                    class="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                                    @click="openProductModal(product)">
                                    <img :src="product.images[0]" :alt="product.name"
                                        class="w-full h-40 object-cover rounded-lg mb-2">
                                    <h4 class="text-lg font-semibold">{{ product.name }}</h4>
                                    <p class="text-primary font-bold">MK{{ product.price.toLocaleString() }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import categoriesData from '@/assets/data/category.json';
import productsData from '@/assets/data/product.json';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation
    },
    setup() {
        const route = useRoute();
        const router = useRouter();

        const categories = ref(categoriesData);
        const allProducts = ref(productsData);
        const filteredProducts = ref(productsData);
        const cart = ref([]);
        const showCart = ref(false);
        const showCheckout = ref(false);
        const showProductModal = ref(false);
        const customerName = ref('');
        const customerEmail = ref('');
        const customerAddress = ref('');
        const selectedCategory = ref(null);
        const selectedProduct = ref(null);
        const selectedQuantity = ref(1);
        const searchQuery = ref('');
        const sortOption = ref('default');
        const currentPage = ref(1);
        const itemsPerPage = 9;
        const showSidebar = ref(true);
        const showSearchOverlay = ref(false);
        const selectedMaterials = ref([]);
        const selectedSizes = ref([]);
        const selectedColors = ref([]);
        const minDiscount = ref(0);
        const isSearching = ref(false);
        const shoppingLimit = ref(0);
        const shoppingLimitSet = ref(false);



        const uniqueMaterials = computed(() => {
            const materials = allProducts.value.flatMap(product => product.materials_used.split(', '));
            return [...new Set(materials)];
        });


        const uniqueSizes = computed(() => {
            const sizes = allProducts.value.flatMap(product => Array.isArray(product.size) ? product.size : [product.size]);
            return [...new Set(sizes)];
        });

        const uniqueColors = computed(() => {
            return [...new Set(allProducts.value.map(product => product.color))];
        });

        const uniqueTags = computed(() => {
            const tags = allProducts.value.flatMap(product => product.tags);
            return [...new Set(tags)];
        });

        const cartTotal = computed(() => {
            return cart.value.reduce((total, item) => total + item.price * item.quantity, 0);
        });

        const cartItemCount = computed(() => {
            return cart.value.reduce((count, item) => count + item.quantity, 0);
        });

        const paginatedProducts = computed(() => {
            const startIndex = (currentPage.value - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return filteredProducts.value.slice(startIndex, endIndex);
        });

        const totalPages = computed(() => {
            return Math.ceil(filteredProducts.value.length / itemsPerPage);
        });

        const recommendedProducts = computed(() => {
            if (!selectedProduct.value) return [];
            return allProducts.value
                .filter(product => product.id !== selectedProduct.value.id &&
                    (product.category_id === selectedProduct.value.category_id ||
                        product.tags.some(tag => selectedProduct.value.tags.includes(tag))))
                .slice(0, 3);
        });

        watch(searchQuery, () => {
            handleSearch();
            currentPage.value = 1;
        });

        onMounted(() => {
            // Load cart from localStorage
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                cart.value = JSON.parse(savedCart);
            }

            // Set initial state from URL params
            const { category, search, materials, sizes, colors, discount } = route.query;
            if (category) {
                selectedCategory.value = categories.value.find(c => c.id === parseInt(category));
            }
            if (search) {
                searchQuery.value = search;
                handleSearch();
            }
            if (materials) {
                selectedMaterials.value = materials.split(',');
            }
            if (sizes) {
                selectedSizes.value = sizes.split(',');
            }
            if (colors) {
                selectedColors.value = colors.split(',');
            }
            if (discount) {
                minDiscount.value = parseInt(discount);
            }
            applyFilters();
        });

        const updateUrlParams = () => {
            const query = {
                ...(selectedCategory.value && { category: selectedCategory.value.id }),
                ...(searchQuery.value && { search: searchQuery.value }),
                ...(selectedMaterials.value.length && { materials: selectedMaterials.value.join(',') }),
                ...(selectedSizes.value.length && { sizes: selectedSizes.value.join(',') }),
                ...(selectedColors.value.length && { colors: selectedColors.value.join(',') }),
                ...(minDiscount.value > 0 && { discount: minDiscount.value }),
            };
            router.push({ query });
        };

        const selectCategory = (category) => {
            selectedCategory.value = category;
            if (category) {
                filteredProducts.value = allProducts.value.filter(item => item.category_id === category.id);
            } else {
                filteredProducts.value = allProducts.value;
            }
            currentPage.value = 1;
            updateUrlParams();
        };

        const handleSearch = () => {
            const query = searchQuery.value.toLowerCase();
            filteredProducts.value = allProducts.value.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.tags.some(tag => tag.toLowerCase().includes(query))
            );
            isSearching.value = query.length > 0;
            updateUrlParams();
        };

        const handleSort = () => {
            switch (sortOption.value) {
                case 'price_asc':
                    filteredProducts.value.sort((a, b) => a.price - b.price);
                    break;
                case 'price_desc':
                    filteredProducts.value.sort((a, b) => b.price - a.price);
                    break;
                case 'name_asc':
                    filteredProducts.value.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name_desc':
                    filteredProducts.value.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'ranking':
                    filteredProducts.value.sort((a, b) => calculateRank(b) - calculateRank(a));
                    break;
                default:
                    filteredProducts.value = [...allProducts.value];
            }
        };

        const calculateRank = (product) => {
            const salesWeight = 0.4;
            const ratingWeight = 0.3;
            const viewsWeight = 0.2;
            const discountWeight = 0.1;

            const salesScore = product.sales_volume / Math.max(...allProducts.value.map(p => p.sales_volume));
            const ratingScore = product.rating / 5;
            const viewsScore = product.views_count / Math.max(...allProducts.value.map(p => p.views_count));
            const discountScore = product.discount_percentage / 100;

            return (salesScore * salesWeight) +
                (ratingScore * ratingWeight) +
                (viewsScore * viewsWeight) +
                (discountScore * discountWeight);
        };

        const addToCart = (item) => {
            const newTotal = cartTotal.value + item.price;
            if (shoppingLimitSet.value && newTotal > shoppingLimit.value) {
                toast.error("Adding this item would exceed your shopping limit.");
                return;
            }

            const existingItem = cart.value.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.value.push({ ...item, quantity: 1 });
            }
            updateCart();
            toast.success(`${item.name} added to cart.`);
            checkCartLimit();
        };

        const addToCartFromModal = () => {
            const newTotal = cartTotal.value + selectedProduct.value.price * selectedQuantity.value;
            if (shoppingLimitSet.value && newTotal > shoppingLimit.value) {
                toast.error("Adding this item would exceed your shopping limit.");
                return;
            }

            const item = { ...selectedProduct.value, quantity: selectedQuantity.value };
            const existingItem = cart.value.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity += selectedQuantity.value;
            } else {
                cart.value.push(item);
            }
            updateCart();
            toast.success(`${item.quantity} ${item.name}(s) added to cart.`);
            closeProductModal();
            checkCartLimit();
        };

        const removeFromCart = (index) => {
            cart.value.splice(index, 1);
            updateCart();
        };

        const increaseQuantity = (item) => {
            const newTotal = cartTotal.value + item.price;
            if (shoppingLimitSet.value && newTotal > shoppingLimit.value) {
                toast.error("Increasing quantity would exceed your shopping limit.");
                return;
            }
            item.quantity++;
            updateCart();
            checkCartLimit();
        };

        const decreaseQuantity = (item) => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                removeFromCart(cart.value.indexOf(item));
            }
            updateCart();
        };



        const updateCart = () => {
            localStorage.setItem('cart', JSON.stringify(cart.value));
        };

        const checkCartLimit = () => {
            if (shoppingLimitSet.value) {
                const currentTotal = cartTotal.value;
                if (currentTotal >= shoppingLimit.value * 0.5 && currentTotal < shoppingLimit.value * 0.9) {
                    toast.warning(`You've reached 50% of your shopping limit.`);
                } else if (currentTotal >= shoppingLimit.value * 0.9 && currentTotal < shoppingLimit.value) {
                    toast.warning(`You've reached 90% of your shopping limit.`);
                } else if (currentTotal >= shoppingLimit.value) {
                    toast.error(`You've reached your shopping limit of MK${shoppingLimit.value.toLocaleString()}`);
                }
            }
        };

        const proceedToCheckout = () => {
            if (shoppingLimitSet.value && cartTotal.value > shoppingLimit.value) {
                toast.error(`Cannot proceed to checkout. You've exceeded your shopping limit of MK${shoppingLimit.value.toLocaleString()}`);
                return;
            }
            showCart.value = false;
            showCheckout.value = true;
        };

        const placeOrder = async () => {
            // Simulating order placement with a delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast.success('Order placed successfully!');

            // Reset cart and checkout form
            cart.value = [];
            updateCart();
            customerName.value = '';
            customerEmail.value = '';
            customerAddress.value = '';
            showCheckout.value = false;
        };

        const cancelOrder = () => {
            toast.info('Order canceled');
            showCheckout.value = false;
        };

        const getCategoryIcon = (categoryName) => {
            const icons = {
                'Electronics': 'fas fa-laptop',
                'Clothing': 'fas fa-tshirt',
                'Home & Garden': 'fas fa-home',
                'Beauty': 'fas fa-spa',
                'Sports': 'fas fa-futbol',
            };
            return icons[categoryName] || 'fas fa-box';
        };

        const openProductModal = (product) => {
            selectedProduct.value = product;
            selectedQuantity.value = 1;
            showProductModal.value = true;
        };


        const nextPage = (page) => {

            currentPage.value = page;
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        }

        const closeProductModal = () => {
            showProductModal.value = false;
            selectedProduct.value = null;
            selectedQuantity.value = 1;
        };

        const toggleSidebar = () => {
            showSidebar.value = !showSidebar.value;
        };

        const toggleColor = (color) => {
            const index = selectedColors.value.indexOf(color);
            if (index === -1) {
                selectedColors.value.push(color);
            } else {
                selectedColors.value.splice(index, 1);
            }
        };

        const applyFilters = () => {
            filteredProducts.value = allProducts.value.filter(product => {
                const matchesCategory = !selectedCategory.value || product.category_id === selectedCategory.value.id;
                const matchesMaterials = selectedMaterials.value.length === 0 || selectedMaterials.value.some(material => product.materials_used.includes(material));
                const matchesSizes = selectedSizes.value.length === 0 || (Array.isArray(product.size) ? product.size.some(size => selectedSizes.value.includes(size)) : selectedSizes.value.includes(product.size));
                const matchesColors = selectedColors.value.length === 0 || selectedColors.value.includes(product.color);
                const matchesDiscount = product.discount_percentage >= minDiscount.value;

                return matchesCategory && matchesMaterials && matchesSizes && matchesColors && matchesDiscount;
            });

            currentPage.value = 1;
            updateUrlParams();
        };

        const addMaterialToSearch = (material) => {
            searchQuery.value += ` ${material}`;
            handleSearch();
        };

        const addTagToSearch = (tag) => {
            searchQuery.value += ` ${tag}`;
            handleSearch();
        };

        const setShoppingLimit = () => {
            if (shoppingLimit.value > 0) {
                shoppingLimitSet.value = true;
                toast.success(`Shopping limit set to MK${shoppingLimit.value.toLocaleString()}`);
            } else {
                toast.error("Please enter a valid shopping limit.");
            }
        };

        const closeSearchOverlay = () => {
            showSearchOverlay.value = false;
        };
        


        const getImageFromUrl = (url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    const dataUrl = canvas.toDataURL('image/png');
                    resolve(dataUrl);
                };
                img.onerror = (error) => reject(error);
            });
        };


        const downloadInvoice = async () => {
            const doc = new jsPDF();

            // Image URL (replace this with your logo URL)
            const logoUrl = 'https://firebasestorage.googleapis.com/v0/b/server-services-50a49.appspot.com/o/logo%2FIMG-20240910-WA0039-removebg-preview(1).png?alt=media&token=888ba1f5-5468-4e63-a080-c4e3f251446a';

            try {
                // Fetch and convert the image to base64
                const logoBase64 = await getImageFromUrl(logoUrl);

                // Add logo to the top left corner
                doc.addImage(logoBase64, 'PNG', 10, 10, 50, 20); // Adjust the coordinates and size as needed

            } catch (error) {
                console.error('Error loading logo image:', error);
            }

            // Add invoice header
            doc.setFontSize(20);
            doc.text('Invoice', 105, 40, null, null, 'center'); // Adjusted position to fit with the logo

            doc.setFontSize(12);
            doc.text(`Customer: ${customerName.value}`, 20, 60);
            doc.text(`Email: ${customerEmail.value}`, 20, 70);
            doc.text(`Address: ${customerAddress.value}`, 20, 80);
            doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 90);

            // Create table for cart items
            const tableColumn = ["Item", "Quantity", "Price", "Total"];
            const tableRows = [];

            cart.value.forEach((item) => {
                const itemData = [
                    item.name,
                    item.quantity,
                    `MK${item.price.toLocaleString()}`,
                    `MK${(item.price * item.quantity).toLocaleString()}`
                ];
                tableRows.push(itemData);
            });

            // Add table with orange color scheme
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 100,
                styles: {
                    fillColor: [255, 165, 0], // Orange color for table cells
                    textColor: 255, // White text color
                    halign: 'center', // Center align text
                },
                headStyles: {
                    fillColor: [255, 140, 0], // Darker orange for header
                    textColor: 255, // White text color in header
                },
                alternateRowStyles: {
                    fillColor: [255, 215, 180], // Lighter orange for alternate rows
                }
            });

            // Add total
            const finalY = doc.lastAutoTable.finalY || 100;
            doc.text(`Total: MK${cartTotal.value.toLocaleString()}`, 14, finalY + 20);

            // Save the PDF
            doc.save('invoice.pdf');
        };


        return {
            categories,
            filteredProducts,
            cart,
            showCart,
            showCheckout,
            showProductModal,
            customerName,
            customerEmail,
            customerAddress,
            selectedCategory,
            selectedProduct,
            selectedQuantity,
            searchQuery,
            sortOption,
            currentPage,
            cartTotal,
            cartItemCount,
            paginatedProducts,
            totalPages,
            showSidebar,
            showSearchOverlay,
            selectedMaterials,
            selectedSizes,
            selectedColors,
            minDiscount,
            uniqueMaterials,
            uniqueSizes,
            uniqueColors,
            uniqueTags,
            recommendedProducts,
            isSearching,
            shoppingLimit,
            shoppingLimitSet,
            selectCategory,
            handleSearch,
            handleSort,
            addToCart,
            addToCartFromModal,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            proceedToCheckout,
            placeOrder,
            cancelOrder,
            getCategoryIcon,
            openProductModal,
            closeProductModal,
            toggleSidebar,
            toggleColor,
            applyFilters,
            addMaterialToSearch,
            addTagToSearch,
            setShoppingLimit,
            closeSearchOverlay,
            downloadInvoice,
            nextPage
        };
    },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}
</style>