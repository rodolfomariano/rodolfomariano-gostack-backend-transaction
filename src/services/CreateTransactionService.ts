import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';


interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {

    if(!['income', 'outcome'].includes(type)) {
      throw new Error('type invalid')
    }

    const { total } = this.transactionsRepository.getBalance();

    if(type === "outcome" && total < value) {
      throw new Error('You dont have money to this it')
    }
    const newTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return newTransaction;
    
  }
}

export default CreateTransactionService;
