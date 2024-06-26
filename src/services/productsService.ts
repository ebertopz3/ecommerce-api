import { IProduct } from '../interfaces/productInterface'
import { IApiResponse } from '../interfaces/response'
import { pool } from '../database/connection'
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ProductsService {
  const select = `SELECT id,
                         description,
                         price,
                         barcode,
                         title,
                         grams,
                         stock,
                         sku,
                         image
                  FROM products`
  export const getProducts = async (
    page_number?: number,
    page_size?: number
  ): Promise<IApiResponse<IProduct[]>> => {
    const queryProducts =
      (page_number && page_size) || (page_number === 0 && page_size)
        ? `${ select }
           ORDER BY id
               LIMIT ${ page_size }
           OFFSET ${ page_number * page_size }`
        : select;
    try {
      const { rows } = await pool.query(queryProducts);
      return {
        data: rows,
        message: "Products fetched successfully",
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      return {
        data: [],
        message: "Error fetching products",
        success: false,
        statusCode: 500,
      };
    }
  };

  export const getProduct = async (
    id: number
  ): Promise<IApiResponse<IProduct | null>> => {
    const queryProduct = `${ select } WHERE id = ${ id }`;
    try {
      const { rows } = await pool.query(queryProduct);
      return {
        data: rows[0],
        message: "Product fetched successfully",
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: "Error fetching product",
        success: false,
        statusCode: 500,
      };
    }
  };

  export const createProduct = async (
    product: IProduct
  ): Promise<IApiResponse<IProduct | null>> => {
    const queryCreateProduct = `INSERT INTO products (description, price, barcode, title, grams, stock, sku, image)
                                VALUES ('${ product.description }',
                                        ${ product.price },
                                        '${ product.barcode }',
                                        '${ product.title }',
                                        ${ product.grams },
                                        ${ product.stock },
                                        '${ product.sku }',
                                        '${ product.image }') RETURNING *`;
    try {
      const { rows } = await pool.query(queryCreateProduct);
      return {
        data: rows[0],
        message: "Product created successfully",
        success: true,
        statusCode: 201,
      };
    } catch (error) {
      return {
        data: null,
        message: "Error creating product",
        success: false,
        statusCode: 500,
        error: error
      };
    }
  };

  export const updateProduct = async (
    id: number,
    product: IProduct
  ): Promise<IApiResponse<IProduct | null>> => {
    const queryUpdateProduct = `UPDATE products
                                SET description = '${ product.description }',
                                    price       = ${ product.price },
                                    barcode     = '${ product.barcode }',
                                    title       = '${ product.title }',
                                    grams       = ${ product.grams },
                                    stock       = ${ product.stock },
                                    sku         = '${ product.sku }',
                                    image       = '${ product.image }'
                                WHERE id = ${ id } RETURNING *`;
    try {
      const { rows } = await pool.query(queryUpdateProduct);
      return {
        data: rows[0],
        message: "Product updated successfully",
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: "Error updating product",
        success: false,
        statusCode: 500,
        error: error
      };
    }
  };
  export const deleteProduct = async (
    id: number
  ): Promise<IApiResponse<IProduct | null>> => {
    const queryDeleteProduct = `DELETE
                                FROM products
                                WHERE id = ${ id } RETURNING *`;
    try {
      const { rows } = await pool.query(queryDeleteProduct);
      return {
        data: rows[0],
        message: "Product deleted successfully",
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: "Error deleting product",
        success: false,
        statusCode: 500,
        error: error
      };
    }
  };
}
