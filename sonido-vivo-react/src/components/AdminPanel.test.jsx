import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { AdminPanel } from './AdminPanel';

describe('Suite de Pruebas Unitarias - AdminPanel (10 Tests)', () => {
  const productosSimulados = [
    { id: 1, nombre: 'Guitarra Acústica', precio: 100000, stock: 5, categoria: 'Guitarras' },
    { id: 2, nombre: 'Batería Electrónica', precio: 300000, stock: 0, categoria: 'Baterías' }
  ];

  // 1. Renderizado del título principal
  test('1. Renderizado: Muestra el título principal del panel', () => {
    render(
      <AdminPanel
        productos={productosSimulados}
        pedidos={[]}
        onUpdateStock={() => {}}
        onAddProduct={() => {}}
        onDeleteProduct={() => {}}
      />
    );
    expect(screen.getByText(/Panel de Administración/i)).toBeInTheDocument();
  });

  // 2. Renderizado del subtítulo de formulario
  test('2. Renderizado: Muestra la sección Agregar Nuevo Producto', () => {
    render(
      <AdminPanel
        productos={productosSimulados}
        pedidos={[]}
        onUpdateStock={() => {}}
        onAddProduct={() => {}}
        onDeleteProduct={() => {}}
      />
    );
    expect(screen.getByText('Agregar Nuevo Producto')).toBeInTheDocument();
  });

  // 3. Renderizado de lista de productos
  test('3. Renderizado: Muestra los nombres de los productos provistos en las props', () => {
    render(
      <AdminPanel
        productos={productosSimulados}
        pedidos={[]}
        onUpdateStock={() => {}}
        onAddProduct={() => {}}
        onDeleteProduct={() => {}}
      />
    );
    expect(screen.getByText('Guitarra Acústica')).toBeInTheDocument();
    expect(screen.getByText('Batería Electrónica')).toBeInTheDocument();
  });

  // 4. Renderizado condicional de Badges (Con stock)
  test('4. Renderizado Condicional: Muestra badge info cuando el stock es mayor a 0', () => {
    render(
      <AdminPanel
        productos={productosSimulados}
        pedidos={[]}
        onUpdateStock={() => {}}
        onAddProduct={() => {}}
        onDeleteProduct={() => {}}
      />
    );
    expect(screen.getByText('5 un.')).toHaveClass('bg-info');
  });

  // 5. Renderizado condicional de Badges (Sin stock)
  test('5. Renderizado Condicional: Muestra badge danger cuando el stock es 0', () => {
    render(
      <AdminPanel
        productos={productosSimulados}
        pedidos={[]}
        onUpdateStock={() => {}}
        onAddProduct={() => {}}
        onDeleteProduct={() => {}}
      />
    );
    expect(screen.getByText('0 un.')).toHaveClass('bg-danger');
  });

  // 6. Eventos y Props: Actualizar stock (+5 Stock)
  test('6. Eventos / Props: Dispara onUpdateStock con la cantidad incrementada', () => {
    const mockUpdateStock = vi.fn();
    render(
      <AdminPanel
        productos={productosSimulados}
        pedidos={[]}
        onUpdateStock={mockUpdateStock}
        onAddProduct={() => {}}
        onDeleteProduct={() => {}}
      />
    );
    const botonesStock = screen.getAllByText('+5 Stock');
    fireEvent.click(botonesStock[0]);
    expect(mockUpdateStock).toHaveBeenCalledWith(1, 10);
  });

  // 7. Eventos y Props: Eliminar producto
  test('7. Eventos / Props: Dispara onDeleteProduct al pulsar la papelera', () => {
    const mockDelete = vi.fn();
    render(
      <AdminPanel
        productos={productosSimulados}
        pedidos={[]}
        onUpdateStock={() => {}}
        onAddProduct={() => {}}
        onDeleteProduct={mockDelete}
      />
    );
    const botonesEliminar = screen.getAllByTitle('Eliminar producto');
    fireEvent.click(botonesEliminar[0]);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  // 8. Estado del formulario: Permite modificar el campo de texto (Nombre)
  test('8. Estado: Cambia el valor del input de nombre al escribir', () => {
    render(
      <AdminPanel
        productos={productosSimulados}
        pedidos={[]}
        onUpdateStock={() => {}}
        onAddProduct={() => {}}
        onDeleteProduct={() => {}}
      />
    );
    const inputNombre = screen.getAllByRole('textbox')[0];
    fireEvent.change(inputNombre, { target: { value: 'Bajo Eléctrico' } });
    expect(inputNombre.value).toBe('Bajo Eléctrico');
  });

  // 9. Estado del formulario: Permite seleccionar una categoría
  test('9. Estado: Cambia la categoría seleccionada en el menú desplegable', () => {
    render(
      <AdminPanel
        productos={productosSimulados}
        pedidos={[]}
        onUpdateStock={() => {}}
        onAddProduct={() => {}}
        onDeleteProduct={() => {}}
      />
    );
    const selectCategoria = screen.getByRole('combobox');
    fireEvent.change(selectCategoria, { target: { value: 'Baterías' } });
    expect(selectCategoria.value).toBe('Baterías');
  });

  // 10. Simulación de Formulario Completo y envío
  test('10. Eventos / Estado: Llama a onAddProduct al enviar el formulario completo', () => {
    const mockAddProduct = vi.fn();
    render(
      <AdminPanel
        productos={productosSimulados}
        pedidos={[]}
        onUpdateStock={() => {}}
        onAddProduct={mockAddProduct}
        onDeleteProduct={() => {}}
      />
    );

    const inputNombre = screen.getAllByRole('textbox')[0];
    const inputsNumber = screen.getAllByRole('spinbutton');
    const botonCrear = screen.getByRole('button', { name: /\+ Crear Producto/i });

    fireEvent.change(inputNombre, { target: { value: 'Teclado Yamaha' } });
    fireEvent.change(inputsNumber[0], { target: { value: '150000' } });
    fireEvent.change(inputsNumber[1], { target: { value: '8' } });

    fireEvent.click(botonCrear);

    expect(mockAddProduct).toHaveBeenCalledWith(
      expect.objectContaining({
        nombre: 'Teclado Yamaha',
        precio: 150000,
        stock: 8
      })
    );
  });
});