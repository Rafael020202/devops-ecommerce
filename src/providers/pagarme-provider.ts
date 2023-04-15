import { PaymentGateway } from '@/contracts';
import { createTransactionRequest } from '@/helpers';

export class PagarmeProvider implements PaymentGateway {
  async createTransaction(
    params: PaymentGateway.createTransaction['Params']
  ): Promise<PaymentGateway.createTransaction['Result']> {
    try {
      const result = await createTransactionRequest(params);

      logger.info(result);

      return {
        id: result.id,
        status: result.status
      };
    } catch (error) {
      logger.error(error.response.data);
    }

    return;
  }
}
