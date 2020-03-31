import { createParamDecorator } from 'routing-controllers';

export function FirebaseUID(options?: {}) {
  return createParamDecorator({
    required: true,
    value: async action => {
      const uid = action.request.uid;
      return uid;
    },
  });
}