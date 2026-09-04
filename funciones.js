const productos = [
    { id: 1, nombre: "Guitarra Eléctrica Fender Stratocaster", categoria: "Guitarras Eléctricas", precio: 750000, stock: 3, img: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=400&q=80" },
    { id: 2, nombre: "Bajo Eléctrico Ibanez 4 Cuerdas", categoria: "Bajos Eléctricos", precio: 420000, stock: 5, img: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=400&q=80" },
    { id: 3, nombre: "Teclado Sintetizador Yamaha", categoria: "Teclados y Pianos", precio: 380000, stock: 2, img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=400&q=80" },
    { id: 4, nombre: "Amplificador Marshall 50W", categoria: "Amplificadores", precio: 290000, stock: 4, img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80" }
];

let carrito = [];

const pedidos = [
    { id: "SV-1001", cliente: "Carlos Muñoz", transporte: "Starken", estado: "En Preparación", total: 420000 },
    { id: "SV-1002", cliente: "María Rojas", transporte: "Chilexpress", estado: "Despachado", total: 750000 }
];

let rolActual = "Cliente";

function cargarProductos(lista) {
    const contenedor = document.getElementById("product-list");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    lista.forEach(p => {
        contenedor.innerHTML += `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm">
                    <img src="${p.img}" class="card-img-top" alt="${p.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fs-6 fw-bold">${p.nombre}</h5>
                        <p class="card-text text-muted mb-1">Cat: ${p.categoria}</p>
                        <p class="fw-bold text-success mb-2">$${p.precio.toLocaleString('es-CL')}</p>
                        <p class="small text-${p.stock > 0 ? 'secondary' : 'danger'} mb-3">Stock disponible: ${p.stock}</p>
                        <button class="btn btn-primary mt-auto btn-sm" onclick="agregarAlCarrito(${p.id})">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto && producto.stock > 0) {
        carrito.push(producto);
        actualizarCarrito();
    } else {
        alert("Producto sin stock disponible");
    }
}

function actualizarCarrito() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.innerText = carrito.length;

    const listaCarrito = document.getElementById("cart-items");
    const totalCarrito = document.getElementById("cart-total");
    const btnProceed = document.getElementById("btn-proceed-checkout");

    if (!listaCarrito || !totalCarrito) return;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = `<li class="list-group-item text-center">El carrito está vacío</li>`;
        totalCarrito.innerText = "$0";
        if (btnProceed) btnProceed.disabled = true;
        return;
    }

    if (btnProceed) btnProceed.disabled = false;
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((p, index) => {
        total += p.precio;
        listaCarrito.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="my-0">${p.nombre}</h6>
                    <small class="text-muted">$${p.precio.toLocaleString('es-CL')}</small>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${index})">X</button>
            </li>
        `;
    });

    totalCarrito.innerText = `$${total.toLocaleString('es-CL')}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const vinaDelMar = [-33.0245, -71.5518];
    const map = L.map('map').setView(vinaDelMar, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([-33.0245, -71.5518]).addTo(map)
        .bindPopup('<b>Sonido Vivo - Casa Matriz</b><br>Av. Libertad #450, Viña del Mar.')
        .openPopup();

    L.marker([-33.0150, -71.5430]).addTo(map)
        .bindPopup('<b>Punto de Retiro Autorizado</b><br>Sector Reñaca, Viña del Mar.');
}

// LÓGICA DE ROLES Y PANELES (Con desplazamiento automático)
function cambiarRolUI(nuevoRol) {
    rolActual = nuevoRol;
    const userRoleEl = document.getElementById("user-display-role");
    if (userRoleEl) userRoleEl.innerText = nuevoRol;

    const banner = document.getElementById("user-banner");
    if (banner) banner.classList.remove("d-none");

    const panelVendedor = document.getElementById("panel-vendedor");
    const panelAdmin = document.getElementById("panel-admin");

    if (panelVendedor) panelVendedor.classList.add("d-none");
    if (panelAdmin) panelAdmin.classList.add("d-none");

    if (nuevoRol === "Vendedor" && panelVendedor) {
        panelVendedor.classList.remove("d-none");
        renderizarTablaVendedor();
        panelVendedor.scrollIntoView({ behavior: 'smooth' });
    } else if (nuevoRol === "Administrador" && panelAdmin) {
        panelAdmin.classList.remove("d-none");
        const adminOrders = document.getElementById("admin-total-orders");
        if (adminOrders) adminOrders.innerText = pedidos.length;
        panelAdmin.scrollIntoView({ behavior: 'smooth' });
    }
}

function renderizarTablaVendedor() {
    // Renderizar tabla de Stock
    const tbodyStock = document.getElementById("vendor-stock-list");
    if (tbodyStock) {
        tbodyStock.innerHTML = "";
        productos.forEach(p => {
            tbodyStock.innerHTML += `
                <tr>
                    <td>${p.nombre}</td>
                    <td>${p.categoria}</td>
                    <td>$${p.precio.toLocaleString('es-CL')}</td>
                    <td><span class="badge ${p.stock > 0 ? 'bg-success' : 'bg-danger'}">${p.stock} un.</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="modificarStock(${p.id}, 1)">+1</button>
                        <button class="btn btn-sm btn-outline-secondary" onclick="modificarStock(${p.id}, -1)">-1</button>
                    </td>
                </tr>
            `;
        });
    }

    // Renderizar tabla de Pedidos
    const tbodyPedidos = document.getElementById("vendor-orders-list");
    if (tbodyPedidos) {
        tbodyPedidos.innerHTML = "";
        pedidos.forEach(p => {
            tbodyPedidos.innerHTML += `
                <tr>
                    <td><strong>${p.id}</strong></td>
                    <td>${p.cliente}</td>
                    <td>${p.transporte}</td>
                    <td>$${p.total.toLocaleString('es-CL')}</td>
                    <td><span class="badge bg-info text-dark">${p.estado}</span></td>
                    <td>
                        <button class="btn btn-sm btn-success" onclick="cambiarEstadoPedido('${p.id}', 'Despachado')">Despachar</button>
                        <button class="btn btn-sm btn-primary" onclick="cambiarEstadoPedido('${p.id}', 'Entregado')">Entregar</button>
                    </td>
                </tr>
            `;
        });
    }
}

function modificarStock(id, cambio) {
    const prod = productos.find(p => p.id === id);
    if (prod) {
        prod.stock = Math.max(0, prod.stock + cambio);
        cargarProductos(productos);
        renderizarTablaVendedor();
    }
}

function cambiarEstadoPedido(id, nuevoEstado) {
    const ped = pedidos.find(p => p.id === id);
    if (ped) {
        ped.estado = nuevoEstado;
        renderizarTablaVendedor();
    }
}

// Función auxiliar para validar el RUT chileno (módulo 11)
function validarRut(rut) {
    rut = rut.replace(/[^0-9kK]/g, '');
    if (rut.length < 8) return false;

    const cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    let dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 11) dvEsperado = '0';
    if (dvEsperado === 10) dvEsperado = 'K';

    return dv.toString() === dvEsperado.toString();
}

function cerrarModalBootstrap(modalId) {
    const el = document.getElementById(modalId);
    if (el) {
        const instance = bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el);
        instance.hide();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos(productos);
    initMap();
    actualizarCarrito();

    // Filtro Categoría
    const filterCategory = document.getElementById("filter-category");
    if (filterCategory) {
        filterCategory.addEventListener("change", (e) => {
            const cat = e.target.value;
            if (cat === "todos") {
                cargarProductos(productos);
            } else {
                const filtrados = productos.filter(p => p.categoria === cat);
                cargarProductos(filtrados);
            }
        });
    }

    // Login Simulado
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const rol = document.getElementById("user-role").value;
            cerrarModalBootstrap('loginModal');
            cambiarRolUI(rol);
        });
    }

    // Logout
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            document.getElementById("user-banner")?.classList.add("d-none");
            document.getElementById("panel-vendedor")?.classList.add("d-none");
            document.getElementById("panel-admin")?.classList.add("d-none");
            rolActual = "Cliente";
        });
    }

    // Unificado: Validación y Envío del Formulario de Checkout
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (carrito.length === 0) {
                alert("El carrito está vacío.");
                return;
            }

            const rutInput = document.getElementById("client-rut")?.value || "";
            const phoneInput = document.getElementById("client-phone")?.value || "";

            // Validar RUT
            if (rutInput && !validarRut(rutInput)) {
                alert("El RUT ingresado no es válido. Por favor verifica el formato (ej: 12.345.678-9).");
                return;
            }

            // Validar Teléfono Chileno (9 dígitos o con +56)
            const phoneRegex = /^(\+?56)?(\s?)(0?9)(\s?)[0-9]{8}$/;
            if (phoneInput && !phoneRegex.test(phoneInput)) {
                alert("Por favor ingresa un número de teléfono válido (ej: +56 9 1234 5678).");
                return;
            }

            const nuevoCodigo = `SV-${1001 + pedidos.length}`;
            const nombreCliente = document.getElementById("client-name").value;
            const transporte = document.getElementById("delivery-method").value;
            const totalPedido = carrito.reduce((sum, item) => sum + item.precio, 0);

            pedidos.push({
                id: nuevoCodigo,
                cliente: nombreCliente,
                transporte: transporte,
                estado: "Pendiente de Validación",
                total: totalPedido
            });

            carrito = [];
            actualizarCarrito();

            cerrarModalBootstrap('checkoutModal');

            alert(`¡Pedido realizado con éxito!\nCódigo de seguimiento: ${nuevoCodigo}`);
        });
    }

    // Consultar Tracking
    const btnTracking = document.getElementById("btn-search-tracking");
    if (btnTracking) {
        btnTracking.addEventListener("click", () => {
            const codigoInput = document.getElementById("input-tracking-code");
            const resDiv = document.getElementById("tracking-result");
            if (!codigoInput || !resDiv) return;

            const codigo = codigoInput.value.trim().toUpperCase();
            const p = pedidos.find(item => item.id === codigo);

            if (p) {
                resDiv.innerHTML = `
                    <div class="card border-success">
                        <div class="card-body text-start">
                            <h5 class="card-title fw-bold">Pedido ${p.id}</h5>
                            <p class="mb-1"><strong>Cliente:</strong> ${p.cliente}</p>
                            <p class="mb-1"><strong>Método:</strong> ${p.transporte}</p>
                            <p class="mb-1"><strong>Total:</strong> $${p.total.toLocaleString('es-CL')}</p>
                            <p class="mb-0"><strong>Estado:</strong> <span class="badge bg-primary">${p.estado}</span></p>
                        </div>
                    </div>
                `;
            } else {
                resDiv.innerHTML = `<div class="alert alert-danger">No se encontró el pedido ${codigo}</div>`;
            }
        });
    }
});