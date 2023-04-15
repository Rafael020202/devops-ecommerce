import { PaymentGateway } from '@/contracts';
import { createTransactionRequest } from '@/helpers';

export class PagarmeProvider implements PaymentGateway {
  async createTransaction(
    params: PaymentGateway.createTransaction['Params']
  ): Promise<boolean> {
    try {
      const result = await createTransactionRequest(params);

      logger.info(result);

      return result.status === 200;
    } catch (error) {
      logger.error(error);
    }

    return false;
  }
}
