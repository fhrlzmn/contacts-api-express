import { Router } from 'express';
import {
  getContacts,
  addContact,
  editContact,
  deleteContact,
  getContactById,
  deleteAllContacts,
} from '../controllers/contactsController';

const router: Router = Router();

router.get('/', getContacts);
router.get('/:id', getContactById);
router.post('/', addContact);
router.post('/delete-all', deleteAllContacts);
router.put('/:id', editContact);
router.delete('/:id', deleteContact);

export default router;
