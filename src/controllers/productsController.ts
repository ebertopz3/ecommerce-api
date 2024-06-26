import { ProductsService } from '@services/productsService'
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ProductsController {
  export const getProducts = async (_req: any, _res: any): Promise<void> => {
    const pageSize = parseInt(_req?.params?.page_size, 10) || 0; // Tamaño de la página, valor por defecto 0
    const pageNumber = parseInt(_req?.params?.page_number, 10) || 0;
    const data = await ProductsService.getProducts(pageNumber, pageSize);
    _res.status(data.success ? 200 : 500).json(data);
  }

  export const getProduct = async (_req: any, _res: any): Promise<void> => {
    const id = _req?.params?.id;
    const data = await ProductsService.getProduct(id);
    _res.status(data.success ? 200 : 500).json(data);
  }

  export const createProduct = async (_req: any, _res: any): Promise<void> => {
    const data = await ProductsService.createProduct(_req.body)
    _res.status(data.success ? 200 : 500).json(data);
  }

  export const updateProduct = async (_req: any, _res: any): Promise<void> => {
    const id = _req?.params?.id;
    const data = await ProductsService.updateProduct(id, _req.body)
    _res.status(data.success ? 200 : 500).json(data);
  }

  export const deleteProduct = async (_req: any, _res: any): Promise<void> => {
    const id = _req?.params?.id;
    const data = await ProductsService.deleteProduct(id)
    _res.status(data.success ? 200 : 500).json(data);
  }
}
