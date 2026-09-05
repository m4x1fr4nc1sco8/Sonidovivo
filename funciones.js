const productos = [
    { id: "GA001", nombre: "Guitarra Acústica Folk Yamaha F310", categoria: "Guitarras Acústicas", precio: 129990, stock: 8, img: "https://http2.mlstatic.com/D_NQ_NP_2X_922300-MLC89594324038_082025-F-guitarra-acustica-tipo-folk-yamaha-f310.webp" },
    { id: "GA002", nombre: "Guitarra Acústica Dreadnought Fender CD-60S", categoria: "Guitarras Acústicas", precio: 189990, stock: 5, img: "https://images-na.ssl-images-amazon.com/images/I/7198WAkPuUL.jpg" },
    { id: "GA003", nombre: "Guitarra Acústica Clásica 4/4 Yamaha C40", categoria: "Guitarras Acústicas", precio: 89990, stock: 10, img: "https://http2.mlstatic.com/D_NQ_NP_2X_948126-MLU78686308731_082024-F.webp" },
    { id: "GA004", nombre: "Guitarra Electroacústica Takamine GN20CE", categoria: "Guitarras Acústicas", precio: 349990, stock: 3, img: "https://rdmusico.cl/cdn/shop/files/180934-1200-auto.webp?v=1755969817" },
    { id: "GA005", nombre: "Guitarra 3/4 Niños Yamaha JR1", categoria: "Guitarras Acústicas", precio: 79990, stock: 6, img: "https://r2.gear4music.com/media/71/713658/600/preview.jpg" },
    { id: "GE001", nombre: "Guitarra Eléctrica Stratocaster Squier Affinity Strat", categoria: "Guitarras Eléctricas", precio: 249990, stock: 5, img: "https://audiomusicacl.vtexassets.com/arquivos/ids/191373-1200-auto?v=638525238272970000&width=1200&height=auto&aspect=true" },
    { id: "GE002", nombre: "Guitarra Eléctrica Les Paul Epiphone Les Paul Std", categoria: "Guitarras Eléctricas", precio: 329990, stock: 4, img: "https://media.spdigital.cl/thumbnails/products/n54dmcp4_386c6323_thumbnail_512.png" },
    { id: "GE003", nombre: "Guitarra Eléctrica SG Epiphone SG Standard", categoria: "Guitarras Eléctricas", precio: 319990, stock: 3, img: "https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/prd-cl/product-medias/3908b463-ba9d-4c18-b688-144fa7c5408e/MK9D1X6DYX/MK9D1X6DYX-1/1712677098490-MK9D1X6DYX-1-0.jpg" },
    { id: "GE004", nombre: "Guitarra Eléctrica Telecaster Squier Classic Vibe 50s", categoria: "Guitarras Eléctricas", precio: 399990, stock: 2, img: "https://audiomusicacl.vtexassets.com/arquivos/ids/208813-1200-auto?v=639088534130300000&width=1200&height=auto&aspect=true" },
    { id: "GE005", nombre: "Guitarra Eléctrica RG Ibanez GRG121DX", categoria: "Guitarras Eléctricas", precio: 219990, stock: 6, img: "https://media.spdigital.cl/thumbnails/products/pa6nvdd7_4a9bf8a0_thumbnail_512.jpg" },
    { id: "BE001", nombre: "Bajo Eléctrico 4 Cuerdas Ibanez GSR200", categoria: "Bajos Eléctricos", precio: 259990, stock: 4, img: "https://i5.walmartimages.cl/asr/e1169ad8-53f8-4997-8925-116a3bf4f534.3232330ff5fe3ef9d3837b3c1c115db8.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" },
    { id: "BE002", nombre: "Bajo Eléctrico Jazz Bass Squier Affinity JB", categoria: "Bajos Eléctricos", precio: 289990, stock: 3, img: "https://lacasadelmusico.cl/wp-content/uploads/2022/10/1644360192_0918.jpg" },
    { id: "BE003", nombre: "Bajo Eléctrico 5 Cuerdas Yamaha TRBX305", categoria: "Bajos Eléctricos", precio: 389990, stock: 2, img: "https://cdnx.jumpseller.com/instruments/image/70527976/thumb/1440/1440?1765304502" },
    { id: "BE004", nombre: "Bajo Eléctrico Precision Bass Squier Classic Vibe 60s PB", categoria: "Bajos Eléctricos", precio: 419990, stock: 2, img: "https://audiomusicacl.vtexassets.com/arquivos/ids/197179-1200-auto?v=638726506944030000&width=1200&height=auto&aspect=true" },
    { id: "BE005", nombre: "Bajo Activo 4 Cuerdas Cort Action Bass Plus", categoria: "Bajos Eléctricos", precio: 199990, stock: 5, img: "https://gamamusic.com/cdn/shop/files/HCAJ1NT-2.webp?v=1779468075&width=800" },
    { id: "BAT01", nombre: "Batería Acústica 5 Piezas Pearl Export EXX725", categoria: "Baterías", precio: 649990, stock: 2, img: "https://arthurmusic.cl/cdn/shop/files/Export_20EXX725SPC21.jpg?v=1776881607&width=3840" },
    { id: "BAT02", nombre: "Batería Electrónica Roland TD-02KV", categoria: "Baterías", precio: 499990, stock: 3, img: "https://audiomusicacl.vtexassets.com/arquivos/ids/208391-1200-auto?v=639069303453000000&width=1200&height=auto&aspect=true" },
    { id: "BAT03", nombre: "Batería Electrónica Alesis Nitro Max Kit", categoria: "Baterías", precio: 389990, stock: 4, img: "https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/640x0/filters:quality(75)/prd-cl/product-medias/041e5141-f5f1-4a95-9b26-8897b370c22e/MKEU8Z70BT/MKEU8Z70BT-1/1734377898863-MKEU8Z70BT-1-1.jpg" },
    { id: "BAT04", nombre: "Batería Acústica Infantil Mapex Comet Series", categoria: "Baterías", precio: 329990, stock: 3, img: "https://cdnx.jumpseller.com/sagas-music-shop/image/69303621/resize/1438/1438?1762203636" },
    { id: "BAT05", nombre: "Cajón Peruano Flamenquero Meinl HCAJ1NT", categoria: "Baterías", precio: 79990, stock: 7, img: "https://gamamusic.com/cdn/shop/files/HCAJ1NT-2.webp?v=1779468075&width=800" },
    { id: "TEC01", nombre: "Teclado Sensitivo 61 Teclas Yamaha PSR-E373", categoria: "Teclados y Pianos", precio: 229990, stock: 5, img: "https://http2.mlstatic.com/D_NQ_NP_2X_901874-MLU72757256298_112023-F.webp" },
    { id: "TEC02", nombre: "Piano Digital 88 Teclas Pesadas Casio CDP-S110", categoria: "Teclados y Pianos", precio: 429990, stock: 3, img: "https://cdnx.jumpseller.com/mercurymusic/image/63154461/resize/540/540?1746481817" },
    { id: "TEC03", nombre: "Sintetizador Analógico Korg Minilogue XD", categoria: "Teclados y Pianos", precio: 589990, stock: 2, img: "https://cdnx.jumpseller.com/mpro-import/image/29379402/resize/570/765?1668138999" },
    { id: "TEC04", nombre: "Teclado Controlador MIDI Nektar Impact GX61", categoria: "Teclados y Pianos", precio: 119990, stock: 6, img: "https://http2.mlstatic.com/D_NQ_NP_2X_669918-MLC72569001876_112023-F-nektar-impact-gx61--controlador-midi.webp" },
    { id: "TEC05", nombre: "Piano Digital de Escenario Roland FP-10", categoria: "Teclados y Pianos", precio: 499990, stock: 2, img: "https://cdnx.jumpseller.com/instruments/image/76512380/thumb/1440/1440?1778531051" },
    { id: "AMP01", nombre: "Amplificador de Guitarra 15W Fender Mustang LT25", categoria: "Amplificadores", precio: 159990, stock: 5, img: "https://http2.mlstatic.com/D_NQ_NP_2X_734452-CBT111696180005_052026-F.webp" },
    { id: "AMP02", nombre: "Amplificador de Guitarra 50W Boss Katana 50 MKII", categoria: "Amplificadores", precio: 279990, stock: 4, img: "https://http2.mlstatic.com/D_NQ_NP_2X_782627-MLU72829940371_112023-F.webp" },
    { id: "AMP03", nombre: "Amplificador de Bajo 25W Fender Rumble 25", categoria: "Amplificadores", precio: 139990, stock: 6, img: "https://www.fender.cl/media/catalog/product/cache/1/image/265x265/9df78eab33525d08d6e5fb8d27136e95/a/b/ab051_2370200000v2.jpg" },
    { id: "AMP04", nombre: "Amplificador a Tubos 15W Vox AC15C1", categoria: "Amplificadores", precio: 689990, stock: 2, img: "https://cdnx.jumpseller.com/instruments/image/73821460/thumb/1440/1440?1778188391" },
    { id: "AMP05", nombre: "Amplificador de Guitarra 10W Marshall MG10 Gold", categoria: "Amplificadores", precio: 89999, stock: 8, img: "https://cdnx.jumpseller.com/instruments/image/43059949/thumb/1440/1391?1701560869" },
    { id: "MIC01", nombre: "Micrófono Dinámico Vocal Shure SM58", categoria: "Micrófonos", precio: 119990, stock: 12, img: "https://promusic.cl/cdn/shop/files/SM58_3_a99a39d8-1752-410f-8dec-cf7e192ed935.jpg?v=1767620327&width=2000" },
    { id: "MIC02", nombre: "Micrófono de Condensador Audio-Technica AT2020", categoria: "Micrófonos", precio: 99990, stock: 8, img: "https://b2811249.assetcdn.net/2811249/wp-content/uploads/2020/10/AT1-400x400.jpg?lossy=1&strip=1&webp=1" },
    { id: "MIC03", nombre: "Micrófono Dinámico de Instrumento Shure SM57", categoria: "Micrófonos", precio: 109990, stock: 10, img: "https://www.feedbackmusic.cl/wp-content/uploads/2025/09/SM57LC.png" },
    { id: "MIC04", nombre: "Micrófono USB para Streaming HyperX SoloCast", categoria: "Micrófonos", precio: 49990, stock: 15, img: "https://media.falabella.com/falabellaCL/146040963_01/w=1200,h=1200,fit=pad" },
    { id: "MIC05", nombre: "Micrófono de Condensador AKG P120", categoria: "Micrófonos", precio: 89990, stock: 6, img: "https://i5.walmartimages.cl/asr/b06fbb70-2b37-4c42-a8c1-4be2b0be3b55.e4115117fd8a963bb50b06b62e9c6a67.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" },
    { id: "PED01", nombre: "Pedal Overdrive Boss SD-1 Super Overdrive", categoria: "Pedales de Efectos", precio: 69990, stock: 9, img: "https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/640x0/filters:quality(75)/prd-cl/product-medias/7735d94e-be1b-4eb9-8eaf-c543e9a9b488/MK7DE7ORY7/MK7DE7ORY7-1/1751470574243-MK7DE7ORY7-1-1.jpg" },
    { id: "PED02", nombre: "Pedal Delay Electro-Harmonix Canyon Delay", categoria: "Pedales de Efectos", precio: 149990, stock: 4, img: "https://cdnx.jumpseller.com/musicchile/image/57540294/thumb/1600/1600?1759327126" },
    { id: "PED03", nombre: "Pedal Tuner/Afinador TC Electronic PolyTune 3", categoria: "Pedales de Efectos", precio: 89990, stock: 7, img: "https://www.planetmusic.cl/wp-content/uploads/2024/06/TC-Electronic-Polytune-3-Mini-Pedal-Afinador-y-Buffer-de-Guitarra-R-Planet-Music-1200x1200-1-600x600.jpg" },
    { id: "PED04", nombre: "Pedal Distorsión ProCo Rat 2", categoria: "Pedales de Efectos", precio: 99990, stock: 5, img: "https://armonicos.cl/4179-thickbox_default/proco-rat-2.jpg" },
    { id: "PED05", nombre: "Pedal Multi-Efectos Zoom G1 Four", categoria: "Pedales de Efectos", precio: 79990, stock: 10, img: "https://musicstore.cl/9140-thickbox_default/multiefecto-zoom-g1-four.jpg" },
    { id: "ACC01", nombre: "Afinador Cromático de Clip Korg Pitchclip 2", categoria: "Accesorios", precio: 12999, stock: 25, img: "https://audiomusicacl.vtexassets.com/arquivos/ids/180222-1200-auto?v=638011505859270000&width=1200&height=auto&aspect=true" },
    { id: "ACC02", nombre: "Encordado Guitarra Eléctrica 0.10 D'Addario EXL110", categoria: "Accesorios", precio: 8990, stock: 40, img: "https://cdnx.jumpseller.com/musicchile/image/57537872/thumb/1600/1600?1760990174" },
    { id: "ACC03", nombre: "Soporte Universal de Guitarra Hercules GS414B PLUS", categoria: "Accesorios", precio: 34990, stock: 12, img: "https://audiomusicacl.vtexassets.com/arquivos/ids/206890-1200-auto?v=639039995551870000&width=1200&height=auto&aspect=true" },
    { id: "ACC04", nombre: "Cable de Instrumento 3m Fender Deluxe Cable", categoria: "Accesorios", precio: 17990, stock: 20, img: "https://http2.mlstatic.com/D_NQ_NP_2X_904956-MLC86361863747_062025-F.webp" },
    { id: "ACC05", nombre: "Funda Acolchada Guitarra Eléctrica Ritter RGP2-E", categoria: "Accesorios", precio: 29990, stock: 15, img: "https://audiomusicacl.vtexassets.com/arquivos/ids/194419-1200-auto?v=638615180054300000&width=1200&height=auto&aspect=true" },
    { id: "EST01", nombre: "Interfaz de Audio USB Focusrite Scarlett 2i2 4th Gen", categoria: "Estudio y Grabación", precio: 199990, stock: 6, img: "https://http2.mlstatic.com/D_NQ_NP_2X_730789-MLA100048520427_122025-F.webp" },
    { id: "EST02", nombre: "Monitores de Estudio Activos (Par) M-Audio BX5 D3", categoria: "Estudio y Grabación", precio: 229990, stock: 4, img: "https://cdnx.jumpseller.com/sonidos-portenos/image/76331645/thumb/719/719?1778001021" },
    { id: "EST03", nombre: "Audífonos de Monitoreo Audio-Technica ATH-M40x", categoria: "Estudio y Grabación", precio: 109990, stock: 8, img: "https://cdnx.jumpseller.com/instruments/image/69087526/thumb/1440/1440?1761523626" },
    { id: "EST04", nombre: "Consola de Mezcla 6 Canales Yamaha MG06X", categoria: "Estudio y Grabación", precio: 149990, stock: 3, img: "https://promusic.cl/cdn/shop/files/MG06X-1.png?v=1753220131&width=2000" },
    { id: "EST05", nombre: "Controlador MIDI de Pads AKAI LPD8 MK2", categoria: "Estudio y Grabación", precio: 59990, stock: 10, img: "https://b2811249.assetcdn.net/2811249/wp-content/uploads/2023/04/LPD8_II_RGB_angle_right_web-400x400.jpg?lossy=1&strip=1&webp=1" }
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