export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AllCategoriesOutput = {
  __typename?: 'AllCategoriesOutput';
  categories?: Maybe<Array<Category>>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type Category = {
  __typename?: 'Category';
  coverImg: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  storeCount: Scalars['Int']['output'];
  stores?: Maybe<Array<Store>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CategoryInput = {
  page?: Scalars['Int']['input'];
  slug: Scalars['String']['input'];
};

export type CategoryOutput = {
  __typename?: 'CategoryOutput';
  category?: Maybe<Category>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  stores?: Maybe<Array<Store>>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalResults?: Maybe<Scalars['Int']['output']>;
};

export type Chat = {
  __typename?: 'Chat';
  client_Message_status: ChatStatus;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  creator_Message_status: ChatStatus;
  id: Scalars['Float']['output'];
  sender: User;
  updatedAt: Scalars['DateTime']['output'];
};

export type ChatRoom = {
  __typename?: 'ChatRoom';
  chats?: Maybe<Array<Chat>>;
  client: User;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  id: Scalars['Float']['output'];
  unread_messages_user_1: Scalars['Float']['output'];
  unread_messages_user_2: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum ChatStatus {
  Read = 'Read',
  Received = 'Received',
  Sent = 'Sent'
}

export type Commission = {
  __typename?: 'Commission';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  options?: Maybe<Array<CommissionOption>>;
  photo?: Maybe<Scalars['String']['output']>;
  post?: Maybe<Post>;
  price: Scalars['Float']['output'];
  store: Store;
  updatedAt: Scalars['DateTime']['output'];
};

export type CommissionChoice = {
  __typename?: 'CommissionChoice';
  extra?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
};

export type CommissionChoiceInputType = {
  extra?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
};

export type CommissionOption = {
  __typename?: 'CommissionOption';
  choices?: Maybe<Array<CommissionChoice>>;
  extra?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
};

export type CommissionOptionInputType = {
  choices?: InputMaybe<Array<CommissionChoiceInputType>>;
  extra?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
};

export type CreateAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: UserRole;
  username: Scalars['String']['input'];
};

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateChatInput = {
  chatRoomId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
};

export type CreateChatOutput = {
  __typename?: 'CreateChatOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateChatRoomInput = {
  clientId: Scalars['Int']['input'];
  creatorId: Scalars['Int']['input'];
};

export type CreateChatRoomOutput = {
  __typename?: 'CreateChatRoomOutput';
  chatRoomId?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateCommissionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  options?: InputMaybe<Array<CommissionOptionInputType>>;
  photo?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  storeId: Scalars['Float']['input'];
};

export type CreateCommissionOutput = {
  __typename?: 'CreateCommissionOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateOrderInput = {
  items: Array<CreateOrderItemInput>;
  storeId: Scalars['Int']['input'];
};

export type CreateOrderItemInput = {
  commissionId: Scalars['Int']['input'];
  options?: InputMaybe<Array<OrderItemOptionInputType>>;
};

export type CreateOrderOutput = {
  __typename?: 'CreateOrderOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreatePaymentInput = {
  orderId: Scalars['Int']['input'];
  price: Scalars['Float']['input'];
  transactionId: Scalars['String']['input'];
};

export type CreatePaymentOutput = {
  __typename?: 'CreatePaymentOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreatePostInput = {
  commissionId: Scalars['Float']['input'];
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreatePostOutput = {
  __typename?: 'CreatePostOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateStoreInput = {
  categoryName: Scalars['String']['input'];
  coverImg: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateStoreOutput = {
  __typename?: 'CreateStoreOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  storeId?: Maybe<Scalars['Int']['output']>;
};

export type DeleteCommissionInput = {
  commissionId: Scalars['Float']['input'];
};

export type DeleteCommissionOutput = {
  __typename?: 'DeleteCommissionOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeletePostInput = {
  postId: Scalars['Float']['input'];
};

export type DeletePostOutput = {
  __typename?: 'DeletePostOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeleteStoreInput = {
  storeId: Scalars['Float']['input'];
};

export type DeleteStoreOutput = {
  __typename?: 'DeleteStoreOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditCommissionInput = {
  commissionId: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Array<CommissionOptionInputType>>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type EditCommissionOutput = {
  __typename?: 'EditCommissionOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditOrderInput = {
  id: Scalars['Float']['input'];
  status: OrderStatus;
};

export type EditOrderOutput = {
  __typename?: 'EditOrderOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditPostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['Float']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EditPostOutput = {
  __typename?: 'EditPostOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditProfileInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type EditProfileOutput = {
  __typename?: 'EditProfileOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditStoreInput = {
  categoryName?: InputMaybe<Scalars['String']['input']>;
  coverImg?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  storeId: Scalars['Float']['input'];
};

export type EditStoreOutput = {
  __typename?: 'EditStoreOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetChatRoomInput = {
  id: Scalars['Float']['input'];
};

export type GetChatRoomsOutput = {
  __typename?: 'GetChatRoomsOutput';
  chatRooms?: Maybe<Array<ChatRoom>>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetChatroomOutput = {
  __typename?: 'GetChatroomOutput';
  chatRoom?: Maybe<ChatRoom>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetCommissionInput = {
  id: Scalars['Float']['input'];
};

export type GetCommissionOutput = {
  __typename?: 'GetCommissionOutput';
  commission?: Maybe<Commission>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  post?: Maybe<Post>;
};

export type GetOrderInput = {
  id: Scalars['Float']['input'];
};

export type GetOrderOutput = {
  __typename?: 'GetOrderOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  order?: Maybe<Order>;
};

export type GetOrdersInput = {
  page?: Scalars['Int']['input'];
  status?: InputMaybe<OrderStatus>;
};

export type GetOrdersOutput = {
  __typename?: 'GetOrdersOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  orders?: Maybe<Array<Order>>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalResults?: Maybe<Scalars['Int']['output']>;
};

export type GetPaymentOutput = {
  __typename?: 'GetPaymentOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  payments?: Maybe<Array<Payment>>;
};

export type GetPostInput = {
  id: Scalars['Float']['input'];
};

export type GetPostOutput = {
  __typename?: 'GetPostOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  post?: Maybe<Post>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CreateAccountOutput;
  createChat: CreateChatOutput;
  createChatRoom: CreateChatRoomOutput;
  createCommission: CreateCommissionOutput;
  createOrder: CreateOrderOutput;
  createPayment: CreatePaymentOutput;
  createPost: CreatePostOutput;
  createStore: CreateStoreOutput;
  deleteCommission: DeleteCommissionOutput;
  deletePost: DeletePostOutput;
  deleteStore: DeleteStoreOutput;
  editCommission: EditCommissionOutput;
  editOrder: EditOrderOutput;
  editPost: EditPostOutput;
  editProfile: EditProfileOutput;
  editStore: EditStoreOutput;
  login: LoginOutput;
  verifyEmail: VerifyEmailOutput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateChatArgs = {
  input: CreateChatInput;
};


export type MutationCreateChatRoomArgs = {
  input: CreateChatRoomInput;
};


export type MutationCreateCommissionArgs = {
  input: CreateCommissionInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateStoreArgs = {
  input: CreateStoreInput;
};


export type MutationDeleteCommissionArgs = {
  input: DeleteCommissionInput;
};


export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


export type MutationDeleteStoreArgs = {
  input: DeleteStoreInput;
};


export type MutationEditCommissionArgs = {
  input: EditCommissionInput;
};


export type MutationEditOrderArgs = {
  input: EditOrderInput;
};


export type MutationEditPostArgs = {
  input: EditPostInput;
};


export type MutationEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationEditStoreArgs = {
  input: EditStoreInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type MyStoreInput = {
  id: Scalars['Float']['input'];
};

export type MyStoreOutput = {
  __typename?: 'MyStoreOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  store?: Maybe<Store>;
};

export type MyStoresOutput = {
  __typename?: 'MyStoresOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  stores: Array<Store>;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime']['output'];
  customer: User;
  id: Scalars['Float']['output'];
  isPaid: Scalars['Boolean']['output'];
  items: Array<OrderItem>;
  status: OrderStatus;
  store: Store;
  total?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  commission: Commission;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  options?: Maybe<Array<OrderItemOption>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderItemOption = {
  __typename?: 'OrderItemOption';
  choice?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type OrderItemOptionInputType = {
  choice?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export enum OrderStatus {
  Accepted = 'Accepted',
  Canceled = 'Canceled',
  Canceling = 'Canceling',
  Completed = 'Completed',
  Drawing = 'Drawing',
  Pending = 'Pending',
  Rejected = 'Rejected'
}

export type OrderUpdatesInput = {
  id: Scalars['Float']['input'];
};

export type Payment = {
  __typename?: 'Payment';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  order: Order;
  orderId: Scalars['Int']['output'];
  price: Scalars['Float']['output'];
  transactionId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Post = {
  __typename?: 'Post';
  commission: Commission;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  allCategories: AllCategoriesOutput;
  category: CategoryOutput;
  getChatRoom: GetChatroomOutput;
  getChatRooms: GetChatRoomsOutput;
  getCommission: GetCommissionOutput;
  getOrder: GetOrderOutput;
  getOrders: GetOrdersOutput;
  getPayments: GetPaymentOutput;
  getPost: GetPostOutput;
  me: User;
  myStore: MyStoreOutput;
  myStores: MyStoresOutput;
  searchStore: SearchStoreOutput;
  store: StoreOutput;
  stores: StoresOutput;
  userProfile: UserProfileOutput;
};


export type QueryCategoryArgs = {
  input: CategoryInput;
};


export type QueryGetChatRoomArgs = {
  input: GetChatRoomInput;
};


export type QueryGetCommissionArgs = {
  input: GetCommissionInput;
};


export type QueryGetOrderArgs = {
  input: GetOrderInput;
};


export type QueryGetOrdersArgs = {
  input: GetOrdersInput;
};


export type QueryGetPostArgs = {
  input: GetPostInput;
};


export type QueryMyStoreArgs = {
  input: MyStoreInput;
};


export type QuerySearchStoreArgs = {
  input: SearchStoreInput;
};


export type QueryStoreArgs = {
  input: StoreInput;
};


export type QueryStoresArgs = {
  input: StoresInput;
};


export type QueryUserProfileArgs = {
  userId: Scalars['Float']['input'];
};

export type SearchStoreInput = {
  page?: Scalars['Int']['input'];
  query: Scalars['String']['input'];
};

export type SearchStoreOutput = {
  __typename?: 'SearchStoreOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  stores?: Maybe<Array<Store>>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalResults?: Maybe<Scalars['Int']['output']>;
};

export type Store = {
  __typename?: 'Store';
  category: Category;
  commissions: Array<Commission>;
  coverImg: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  orders: Array<Order>;
  updatedAt: Scalars['DateTime']['output'];
};

export type StoreInput = {
  storeId: Scalars['Float']['input'];
};

export type StoreOutput = {
  __typename?: 'StoreOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  store?: Maybe<Store>;
};

export type StoresInput = {
  page?: Scalars['Int']['input'];
};

export type StoresOutput = {
  __typename?: 'StoresOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  results?: Maybe<Array<Store>>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalResults?: Maybe<Scalars['Int']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  orderUpdates: Order;
  pendingOrders: Order;
};


export type SubscriptionOrderUpdatesArgs = {
  input: OrderUpdatesInput;
};

export type User = {
  __typename?: 'User';
  chatRooms?: Maybe<Array<ChatRoom>>;
  chats?: Maybe<Array<Chat>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  isSponsor: Scalars['Boolean']['output'];
  orders: Array<Order>;
  password: Scalars['String']['output'];
  payments: Array<Payment>;
  role: UserRole;
  stores: Array<Store>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type UserProfileOutput = {
  __typename?: 'UserProfileOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export enum UserRole {
  Client = 'Client',
  Creator = 'Creator'
}

export type VerifyEmailInput = {
  code: Scalars['String']['input'];
};

export type VerifyEmailOutput = {
  __typename?: 'VerifyEmailOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CategoriesComponentQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesComponentQuery = { __typename?: 'Query', allCategories: { __typename?: 'AllCategoriesOutput', ok: boolean, error?: string | null, categories?: Array<{ __typename?: 'Category', id: number, name: string, coverImg: string, slug: string, storeCount: number }> | null } };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'CreatePostOutput', ok: boolean, error?: string | null } };

export type CategoryPartsFragment = { __typename?: 'Category', id: number, name: string, coverImg: string, slug: string, storeCount: number };

export type StorePartsFragment = { __typename?: 'Store', id: number, name: string, coverImg: string, description?: string | null, category: { __typename?: 'Category', name: string } };

export type CommissionPartsFragment = { __typename?: 'Commission', id: number, name: string, price: number, photo?: string | null, description?: string | null, options?: Array<{ __typename?: 'CommissionOption', name: string, extra?: number | null, choices?: Array<{ __typename?: 'CommissionChoice', name: string, extra?: number | null }> | null }> | null };

export type OrderPartsFragment = { __typename?: 'Order', id: number, createdAt: any, total?: number | null, status: OrderStatus };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, email: string, username: string, role: UserRole, verified: boolean } };

export type CategoryQueryVariables = Exact<{
  input: CategoryInput;
}>;


export type CategoryQuery = { __typename?: 'Query', category: { __typename?: 'CategoryOutput', ok: boolean, error?: string | null, totalPages?: number | null, totalResults?: number | null, stores?: Array<{ __typename?: 'Store', id: number, name: string, coverImg: string, description?: string | null, category: { __typename?: 'Category', name: string } }> | null, category?: { __typename?: 'Category', id: number, name: string, coverImg: string, slug: string, storeCount: number } | null } };

export type SearchStoreQueryVariables = Exact<{
  input: SearchStoreInput;
}>;


export type SearchStoreQuery = { __typename?: 'Query', searchStore: { __typename?: 'SearchStoreOutput', ok: boolean, error?: string | null, totalPages?: number | null, totalResults?: number | null, stores?: Array<{ __typename?: 'Store', id: number, name: string, coverImg: string, description?: string | null, category: { __typename?: 'Category', name: string } }> | null } };

export type StoreQueryVariables = Exact<{
  input: StoreInput;
}>;


export type StoreQuery = { __typename?: 'Query', store: { __typename?: 'StoreOutput', ok: boolean, error?: string | null, store?: { __typename?: 'Store', id: number, name: string, coverImg: string, description?: string | null, commissions: Array<{ __typename?: 'Commission', id: number, name: string, price: number, photo?: string | null, description?: string | null, options?: Array<{ __typename?: 'CommissionOption', name: string, extra?: number | null, choices?: Array<{ __typename?: 'CommissionChoice', name: string, extra?: number | null }> | null }> | null }>, category: { __typename?: 'Category', name: string } } | null } };

export type StoresPageQueryVariables = Exact<{
  input: StoresInput;
}>;


export type StoresPageQuery = { __typename?: 'Query', stores: { __typename?: 'StoresOutput', ok: boolean, error?: string | null, totalPages?: number | null, totalResults?: number | null, results?: Array<{ __typename?: 'Store', id: number, name: string, coverImg: string, description?: string | null, category: { __typename?: 'Category', name: string } }> | null } };

export type CreateAccountMutationVariables = Exact<{
  createAccountInput: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CreateAccountOutput', ok: boolean, error?: string | null } };

export type CreateCommissionMutationVariables = Exact<{
  input: CreateCommissionInput;
}>;


export type CreateCommissionMutation = { __typename?: 'Mutation', createCommission: { __typename?: 'CreateCommissionOutput', ok: boolean, error?: string | null } };

export type CreateStoreMutationVariables = Exact<{
  input: CreateStoreInput;
}>;


export type CreateStoreMutation = { __typename?: 'Mutation', createStore: { __typename?: 'CreateStoreOutput', ok: boolean, error?: string | null, storeId?: number | null } };

export type MyStoreQueryVariables = Exact<{
  input: MyStoreInput;
}>;


export type MyStoreQuery = { __typename?: 'Query', myStore: { __typename?: 'MyStoreOutput', ok: boolean, error?: string | null, store?: { __typename?: 'Store', id: number, name: string, coverImg: string, description?: string | null, commissions: Array<{ __typename?: 'Commission', id: number, name: string, price: number, photo?: string | null, description?: string | null, options?: Array<{ __typename?: 'CommissionOption', name: string, extra?: number | null, choices?: Array<{ __typename?: 'CommissionChoice', name: string, extra?: number | null }> | null }> | null }>, orders: Array<{ __typename?: 'Order', id: number, createdAt: any, total?: number | null, status: OrderStatus }>, category: { __typename?: 'Category', name: string } } | null } };

export type MyStoresQueryVariables = Exact<{ [key: string]: never; }>;


export type MyStoresQuery = { __typename?: 'Query', myStores: { __typename?: 'MyStoresOutput', ok: boolean, error?: string | null, stores: Array<{ __typename?: 'Store', id: number, name: string, coverImg: string, description?: string | null, category: { __typename?: 'Category', name: string } }> } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, token?: string | null, error?: string | null } };

export type GetCommissionQueryVariables = Exact<{
  input: GetCommissionInput;
}>;


export type GetCommissionQuery = { __typename?: 'Query', getCommission: { __typename?: 'GetCommissionOutput', ok: boolean, error?: string | null, commission?: { __typename?: 'Commission', id: number, name: string, price: number, photo?: string | null, description?: string | null, options?: Array<{ __typename?: 'CommissionOption', name: string, extra?: number | null, choices?: Array<{ __typename?: 'CommissionChoice', name: string, extra?: number | null }> | null }> | null } | null, post?: { __typename?: 'Post', id: number, title: string, content: string } | null } };

export type DeleteCommissionMutationVariables = Exact<{
  input: DeleteCommissionInput;
}>;


export type DeleteCommissionMutation = { __typename?: 'Mutation', deleteCommission: { __typename?: 'DeleteCommissionOutput', ok: boolean, error?: string | null } };

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInput;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'VerifyEmailOutput', ok: boolean, error?: string | null } };

export type VerifiedUserFragment = { __typename?: 'User', verified: boolean };

export type EditProfileMutationVariables = Exact<{
  input: EditProfileInput;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'EditProfileOutput', ok: boolean, error?: string | null } };

export type EmailEditedUserFragment = { __typename?: 'User', verified: boolean, email: string };

export type UsernameEditedUserFragment = { __typename?: 'User', username: string };
